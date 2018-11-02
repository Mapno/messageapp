const router = require('express').Router();
const trimmer = require('../utils/functions');
const axios = require("axios");
const jsonValidator = require('../utils/validationMiddleware');
const Message = require('../message/models/Message');

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


    let messageId;
    saveMessage(destination, body)
        .then(msg => messageId = msg._id)

    appRedirect.post("/message", { destination, body })
        .then(response => {
            res.status(200).send(response.data);
            Message.findOneAndUpdate({_id: messageId}, { wasSent: true, isConfirmed: true }, { new: true })
                .then(msg => console.log('Message sent and confirmed', msg))
                .catch(err => console.log('Error updating msg in db', err));
        })
        .catch(error => {
            res.status(500).send(`${error}`);
            Message.findOneAndUpdate({_id: messageId}, { wasSent: true, isConfirmed: false }, { new: true })
                .then(msg => console.log('Message sent but not corfirmed', msg))
                .catch(err => console.log('Error updating msg in db', err));
        });
});

router.get("/", (req, res, next) => {
    findAllMessages()
        .then(messages => res.status(200).send(messages))
        .catch(err => console.log('Error fetching messages from db', err));
});

module.exports = router;