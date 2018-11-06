const router = require('express').Router();
const Credit = require('../models/Credit');
const { creditValidator } = require('../utils/validationMiddleware');
const addCredit = require('../controllers/addCredit')

router.post('/', creditValidator, (req, res, next) => {
    const { amount } = req.body;
    addCredit(req, res, amount);
});

router.post('/new', (req, res, next) => {
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