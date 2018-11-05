const Credit = require('../models/Credit');

const billMessage = (cost) => {
    let tries = 0;

    return Credit.findOneAndUpdate(
        {},
        { $inc: { amount: -cost }, eventState: true },
        { new: true }
    )
        .then(credit => credit)
        .catch(err => {
            console.log('Error saving message in db', err);
            if (tries < 2) {
                console.log(`Retrying. Try number ${tries + 1}`);
                setTimeout(billMessage, 10000);
                tries++;
                tries == 2 ? console.log('Tried saving message 3 times. Error could not be solved. Try again manually.') : 0;
            }
        })
};

module.exports = billMessage;