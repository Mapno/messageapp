const router = require('express').Router();
const axios = require('axios');
const Credit = require('../models/Credit');

router.post('/', (req,res,next) => {
    const { amount } = req.body;
    Credit.findOneAndUpdate({},{ amount }, {new: true})
        .then(credit => res.status(200).json(credit))
        .catch(err => res.status(500).send('Error', err))
})

module.exports = router;