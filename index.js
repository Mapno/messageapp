require('dotenv').config()
const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");

const port = process.env.PORT;
const hostname = process.env.URL || 'localhost';
const sendPort = process.env.SENDPORT;

const appRedirect = axios.create({
    baseURL: `http://${hostname}:${sendPort}`
});

app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post("/message", (req, res, next) => {
    const { destination, body } = req.body;
    appRedirect.post("/message", { destination, body })
        .then(response => res.status(200).send(response.data))
        .catch(error => res.status(500).send(`Error: ${error}`));
});