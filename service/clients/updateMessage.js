const Message = require('../models/Message');

module.exports = (id, wasSent, isConfirmed) => {
    return Message.findOneAndUpdate({ _id: id }, { wasSent, isConfirmed }, { new: true });
};