const router = require('express').Router();
const trimmer = require('../src/functions');
const axios = require("axios");
const Validator = require('jsonschema').Validator;
const v = new Validator();
const messageSchema = require('../validation/messageSchema');

const hostname = process.env.URL || 'localhost';
const sendPort = process.env.SENDPORT || 3000;

const appRedirect = axios.create({
    baseURL: `http://${hostname}:${sendPort}`
});

router.post("/", (req, res, next) => {
    
    let { destination, body } = req.body;

    const validation = v.validate(req.body, messageSchema);

    if(validation.errors.length > 0) {
        let errorMessage = '';
        validation.errors.forEach(error => errorMessage += `${error.stack}. `);
        res.status(400).send(errorMessage);
        return;
    }

    const trimmed = trimmer(destination, body);
    destination = trimmed[0];
    body = trimmed[1];

    appRedirect.post("/message", { destination, body })
        .then(response => res.status(200).send(response.data))
        .catch(error => res.status(500).send(`${error}`));
});

module.exports = router;