module.exports = (amount, db) => {
    return require('../models/Credit')(db).findOneAndUpdate({}, { "amount": amount } , { new: true })
}