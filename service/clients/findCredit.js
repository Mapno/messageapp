const Credit = require('../models/Credit');

module.exports = () => {
    return Credit.find();
};