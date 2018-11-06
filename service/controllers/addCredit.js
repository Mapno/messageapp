const updateCreditValue = require('../clients/updateCreditValue');
const updateSecondaryCredit = require('../clients/updateSecondaryCredit');

module.exports = (req, res, amount, databases) => {
    let primary;
    let secondary;

    if (databases.primary) {
        primary = databases.db1.connection;
        secondary = databases.db2.connection;
    }
    else {
        primary = databases.db2.connection;
        secondary = databases.db1.connection;
    }

    if (databases.db1.status && databases.db2.status) {
        updateCreditValue(amount, primary)
            .then(credit => updateSecondaryCredit(credit.amount, secondary))
            .then(credit => res.status(200).json(credit))
            .catch(err => res.status(500).send(err));
    } else {
        updateCreditValue(amount, primary)
            .then(credit => res.status(200).json(credit))
            .catch(err => res.status(500).send(err));
    }
};