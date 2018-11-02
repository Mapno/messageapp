require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || 9001;

const dbURL = 'mongodb://localhost:27017/messageapp';
const { connect } = require('./database/DatabaseService');
connect(dbURL);

app.use(bodyParser.json({ limit: '1mb' }));

app.listen(port, () => console.log(`Listening on port ${port}`));

const messageRouter = require('./routes/message');
app.use('/message', messageRouter);

const creditRouter = require('./routes/credit');
app.use('/credit', creditRouter);

module.exports = app;