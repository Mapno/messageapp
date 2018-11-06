const Credit = require('../models/Credit');

module.exports = (amount) => {
    return Credit.findOneAndUpdate({}, { $inc: { "amount": amount } }, { new: true })
}