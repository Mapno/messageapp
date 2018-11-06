module.exports = (amount, db) => {
    return require('../models/Credit')(db).findOneAndUpdate({}, { $inc: { "amount": amount } }, { new: true })
}