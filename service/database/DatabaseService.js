const mongoose = require('mongoose');
const Message = require('../models/Message');
const Credit = require('../models/Credit');

let tries = 0;
const saveMessage = (destination, body, wasSent = false, isConfirmed = false) => {
    return new Message({
        destination,
        body,
        wasSent,
        isConfirmed
    }).save()
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

const updateEventState = (eventState) => {
    return Credit.findOneAndUpdate({}, { "eventState": eventState }, { new: true })
        .then(response => console.log(`Event state update to ${eventState}`))
        .catch(err => {
            console.log('Error trying to update the event state', err);
            console.log('Retrying in 1sec');
            setTimeout(updateEventState ,1000);
        })
}

const connect = (dbURL) => {
    return mongoose.connect(dbURL, { useNewUrlParser: true }, (err) => {
        if (err) {
            console.error('Failed to connect to mongo - retrying in 5 sec', err);
            setTimeout(connectWithRetry, 5000);
        } else {
            console.log(`Connected to mongodb. DB name: ${dbURL}`)
        }
    });
};

const findAllMessages = () => {
    return Message.find()
}

const updateMessageStatus = () => {

}

module.exports = { saveMessage, connect, findAllMessages, updateEventState };