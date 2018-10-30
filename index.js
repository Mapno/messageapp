require('dotenv').config()
const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
const Validate = require('./validation');

const validator = new Validate();

const port = process.env.PORT || 9001;
const hostname = process.env.URL || 'localhost';
const sendPort = process.env.SENDPORT || 3000;

const appRedirect = axios.create({
    baseURL: `http://${hostname}:${sendPort}`
});

app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

function trimInputs(...inputs) {
    inputs.forEach((text, index, arr) => arr[index] = text.trim());
    return inputs
};

app.post("/message", (req, res, next) => {

    let { destination, body } = req.body;
    const trimmed = trimInputs(destination, body);
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