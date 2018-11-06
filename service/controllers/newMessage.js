const saveMessage = require('../clients/saveMessage');
const sendMessage = require('../clients/sendMessage');
const updateMessage = require('../clients/updateMessage');
const findCredit = require('../clients/findCredit');
const billMessage = require('../clients/billMessage');
const lockCredit = require('../clients/lockCredit');
const updateSecondaryCredit = require('../clients/updateSecondaryCredit');
const billingRollback = require('../clients/billingRollback');

const messagePrice = 0.5;
let messageID = '';

module.exports = (req, res, destination, body, databases) => {

    let primary;
    let secondary;

    if (databases.primary) {
        primary = databases.db1.connection;
        secondary = databases.db2.connection;
    }
    else {
        primary = databases.db2.connection;
        secondary = databases.db1.connection;
    }

    saveMessage(destination, body, primary)
        .then(message => {
            messageID = message._id;
            saveMessage(destination, body, secondary)
                .catch(err => console.log('Error updating msg in db', err));
        })
        .then(() => findCredit(primary))
        .then(credit => {
            if (credit[0].amount > messagePrice && credit[0].eventState) {
                return;
            } else if (!credit[0].eventState) {
                res.status(500);
                return;
            } else {
                res.status(400).send('No enough credit left in account');
                return;
            }
        })
        .then(() => {
            lockCredit(false, primary)
        })
        .then(() => {
            sendMessage(destination, body)
                .then(response => {
                    res.status(200).send(response.data);
                    updateMessage(messageID, true, true, primary)
                        .then(msg => {
                            const { _id, wasSent, isConfirmed } = msg;
                            updateMessage(_id, wasSent, isConfirmed, secondary)
                                .catch(err => console.log(err));
                        })
                        .then(() => billMessage(messagePrice, primary))
                        .then(credit => {
                            return updateSecondaryCredit(credit.amount, secondary)
                                .catch(err => console.log(err))
                                .then(() => billingRollback(databases, messagePrice))
                        })
                        .then(credit => console.log(`Message sent and confirmed. Credit left: ${credit.amount}€`))
                        .catch(err => console.log('Error updating msg in db', err));
                })
                .catch(error => {
                    res.status(500).send(`${error}`);
                    updateMessage(messageID, true, false, primary)
                        .then(msg => {
                            const { _id, wasSent, isConfirmed } = msg;
                            updateMessage(_id, wasSent, isConfirmed, secondary)
                                .catch(err => console.log('Error updating msg in db', err));
                            console.log(`Message sent but not confirmed.`)
                        })
                        .catch(err => console.log('Error updating msg in db', err));
                })
        })
        .then(() => {
            lockCredit(true, primary)
        })
        .catch(err => res.status(500).send(err));
}