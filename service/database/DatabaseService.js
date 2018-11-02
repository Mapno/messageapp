const mongoose = require('mongoose');
const Message = require('../message/models/Message');

const saveMessage = (destination, body) => {
    return new Message({
        destination,
        body
    }).save()
        .then(msg => console.log(msg))
        .catch(err => console.log('Error saving message in db', err))
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

module.exports = { saveMessage, connect, findAllMessages };