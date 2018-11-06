const router = require('express').Router();
const { creditValidator } = require('../utils/validationMiddleware');
const addCredit = require('../controllers/addCredit')
const { databases } = require('../index');

router.post('/', creditValidator, (req, res, next) => {
    const { amount } = req.body;
    addCredit(req, res, amount, databases);
});


router.post('/new', (req, res, next) => {
    const Credit = require('../models/Credit')(databases.db2.connection)
    console.log(Credit)
    const { amount, eventState } = req.body;
    new Credit({
        amount,
        eventState
    }).save()
    // Credit.findOneAndUpdate({}, { "amount": amount, "eventState": eventState }, { new: true })
        .then(credit => res.status(200).json(credit))
        .catch(err => res.status(500).send('Error', err));
});

module.exports = router;