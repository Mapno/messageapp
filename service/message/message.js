const router = require('express').Router();
const trimmer = require('../utils/functions');
const axios = require("axios");
const jsonValidator = require('../utils/validationMiddleware');

const hostname = process.env.URL || 'localhost';
const sendPort = process.env.SENDPORT || 3000;

const appRedirect = axios.create({
    baseURL: `http://${hostname}:${sendPort}`
});

const { saveMessage, findAllMessages } = require('../database/DatabaseService');

router.post("/", jsonValidator, (req, res, next) => {
    
    let { destination, body } = req.body;

    const trimmed = trimmer(destination, body);
    destination = trimmed[0];
    body = trimmed[1];

    appRedirect.post("/message",{ destination, body })
        .then(response => {
            res.status(200).send(response.data);
            const { destination, body } = JSON.parse(response.config.data);
            saveMessage(destination, body);
        })
        .catch(error => res.status(500).send(`${error}`));
});

router.get("/", (req, res, next) => {
    findAllMessages()
        .then(messages => res.status(200).send(messages))
        .catch(err => console.log('Error fetching messages from db', err));
});

module.exports = router;