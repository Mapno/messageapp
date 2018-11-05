const Message = require('../models/Message');

const findAllMessages = () => {
    return Message.find()
}

module.exports = findAllMessages;