const updateCreditValue = require('../clients/updateCreditValue');

module.exports = (req, res, amount) => {
    updateCreditValue(amount)
        .then(credit => res.status(200).json(credit))
        .catch(err => res.status(500).send('Error', err));
};