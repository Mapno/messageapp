const Message = require('../models/Message');

const saveMessage = (destination, body, wasSent = false, isConfirmed = false) => {
    let tries = 0;

    return new Message({
        destination,
        body,
        wasSent,
        isConfirmed
    })
        .save()
        .then(msg => msg)
        .catch(err => {
            console.log('Error saving message in db', err);
            if (tries < 2) {
                console.log(`Retrying. Try number ${tries + 1}`);
                setTimeout(saveMessage, 1000);
                tries++;
                tries == 2 ? console.log('Tried saving message 3 times. Error could not be solved. Try again manually.') : 0;
            }
        })
};

module.exports = saveMessage;