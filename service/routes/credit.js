const router = require('express').Router();
const { creditValidator } = require('../utils/validationMiddleware');
const addCredit = require('../controllers/addCredit')
const { databases } = require('../index');
const getCredit = require('../clients/getCredit');

router.post('/', creditValidator, (req, res, next) => {
    const { amount } = req.body;
    addCredit(req, res, amount, databases);
});


router.post('/new', (req, res, next) => {
    const Credit = require('../models/Credit')(databases.db1.connection)
    const { amount, eventState } = req.body;
    Credit.collection.drop();
    new Credit({
        amount,
        eventState
    }).save()
        // Credit.findOneAndUpdate({}, { "amount": amount, "eventState": eventState }, { new: true })
        .then(credit => res.status(200).json(credit))
        .catch(err => res.status(500).send('Error', err));
});

router.get('/info', (req, res, next) => {
    getCredit(databases.db1.connection)
        .then(credit => res.status(500).json(credit))
})

module.exports = router;