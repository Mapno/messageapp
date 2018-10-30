const router = require('express').Router();
const trimmer = require('./functions');
const Validate = require('./validation');
const validator = new Validate();
const axios = require("axios");

const hostname = process.env.URL || 'localhost';
const sendPort = process.env.SENDPORT || 3000;

const appRedirect = axios.create({
    baseURL: `http://${hostname}:${sendPort}`
});


router.post("/", (req, res, next) => {

    let { destination, body } = req.body;
    const trimmed = trimmer(destination, body);
    destination = trimmed[0];
    body = trimmed[1];

    if(validator.validateString(destination) || validator.validateString(body)) {
        res.status(400).send('Error: input must be text');
        return;
    };
    if(validator.validateStringLength(destination) || validator.validateStringLength(body)) {
        res.status(400).send('Error: input must be shorter than 1000 characters');
        return;
    };
    if(validator.validateBlankInput(destination) || validator.validateBlankInput(body)) {
        res.status(400).send('Error: input cannot be left blank');
        return;
    };

    appRedirect.post("/message", { destination, body })
        .then(response => res.status(200).send(response.data))
        .catch(error => res.status(500).send(`${error}`));
});

module.exports = router;