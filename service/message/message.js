const router = require('express').Router();
const trimmer = require('../utils/functions');
const axios = require("axios");

const DatabaseService = require('../database/DatabaseService');
const dbURL = 'mongodb://localhost:27017/messageapp'
const db = new DatabaseService(dbURL);

const jsonValidator = require('../utils/validationMiddleware');

const hostname = process.env.URL || 'localhost';
const sendPort = process.env.SENDPORT || 3000;

const appRedirect = axios.create({
    baseURL: `http://${hostname}:${sendPort}`
});

db.connect();

router.post("/", jsonValidator, (req, res, next) => {
    
    let { destination, body } = req.body;

    const trimmed = trimmer(destination, body);
    destination = trimmed[0];
    body = trimmed[1];

    appRedirect.post("/message", { destination, body })
        .then(response => {
            res.status(200).send(response.data)
            // db.save()
        })
        .catch(error => res.status(500).send(`${error}`));
});

module.exports = router;