const Credit = require('../models/Credit');

module.exports = (amount) => {
    console.log(amount)
    return Credit.findOneAndUpdate({}, { $inc: { "amount": amount } }, { new: true })
}