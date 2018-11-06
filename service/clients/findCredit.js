module.exports = (db) => {
    return require('../models/Credit')(db).find();
};