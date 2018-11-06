const findAllMessages = (db) => {
    return require('../models/Message')(db).find()
}

module.exports = findAllMessages;