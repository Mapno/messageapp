const router = require('express').Router();
const Credit = require('../models/Credit');
const { creditValidator } = require('../utils/validationMiddleware');

router.post('/', creditValidator, (req,res,next) => {
    const { amount } = req.body;
    Credit.findOneAndUpdate({},{ amount }, {new: true})
        .then(credit => res.status(200).json(credit))
        .catch(err => res.status(500).send('Error', err))
})

module.exports = router;