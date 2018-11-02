const mongoose = require('mongoose');
const Message = require('../message/models/Message');

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
            console.log('Retrying');
            setTimeout(saveMessage, 1000);
        })
};

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

module.exports = { saveMessage, connect, findAllMessages };