const getCredit = (db) => {
    return require('../models/Credit')(db).find()
}

module.exports = getCredit;