const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");

const appRedirect = axios.create({
    baseURL: "http://localhost:3000"
});

app.use(bodyParser.json());

app.listen(9001, () => console.log("Hola, mundo"));

app.post("/message", (req, res, next) => {
    const { destination, body } = req.body;
    appRedirect.post("/message", { destination, body })
        .then(response => res.send(response.data))
        .catch(error => res.send(`Error: ${error}`));
});

app.post('/test', (req, res, next) => {
    console.log('funciona que no es poco')
    res.send({'esto': 'va bien'})
})