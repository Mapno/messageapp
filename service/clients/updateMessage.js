module.exports = (id, wasSent, isConfirmed, db) => {
    return require('../models/Message')(db).findOneAndUpdate({ _id: id }, { wasSent, isConfirmed }, { new: true });
};