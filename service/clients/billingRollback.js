const billMessage = require('./billMessage');
const updateSecondaryCredit = require('./updateSecondaryCredit');

module.exports = (databases, messagePrice) => {
    return billMessage(-messagePrice, databases.db1.connection)
        .then(() => updateSecondaryCredit(credit.amount, secondary))
}