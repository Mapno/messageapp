require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || 9001;


app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

const messageRouter = require('./message/message');
app.use('/message', messageRouter);