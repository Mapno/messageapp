const saveMessage = require('../clients/saveMessage');
const sendMessage = require('../clients/sendMessage');
const updateMessage = require('../clients/updateMessage');
const findCredit = require('../clients/findCredit');
const billMessage = require('../clients/billMessage');
const lockCredit = require('../clients/lockCredit');

const messagePrice = 0.5;
let messageID = '';

module.exports = (req, res, destination, body) => {
    saveMessage(destination, body)
        .then(message => {
            console.log(message);
            messageID = message._id
        })
        .then(() => findCredit())
        .then(credit => {
            if (credit[0].amount > messagePrice && credit[0].eventState) {
                return;
            } else if(!credit[0].eventState) {
                res.status(500);
                return;
            } else {
                res.status(400).send('No enough credit left in account');
                return;
            }
        })
        .then(() => {
            // lockCredit(false)
        })
        .then(() => {
            sendMessage(destination, body)
                .then(response => {
                    res.status(200).send(response.data);
                    updateMessage(messageID, true, true)
                        .then(msg => billMessage(messagePrice))
                        .then(credit => console.log(`Message sent and confirmed. Credit left: ${credit.amount}€`))
                        .catch(err => console.log('Error updating msg in db', err));
                })
                .catch(error => {
                    res.status(500).send(`${error}`);
                    updateMessage(messageID, true, false)
                        .then(msg => console.log(`Message sent but not confirmed.`))
                        .catch(err => console.log('Error updating msg in db', err));
                })
        })
        .then(() => {
            lockCredit(true)
        })
        .catch(err => res.status(500).send(err))
}