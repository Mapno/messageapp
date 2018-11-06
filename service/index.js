require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const rateLimit = require('./utils/limiter');

const port = process.env.PORT || 9001;

const { connect } = require('./database/databaseClient');
const dbURL1 = 'mongodb://localhost:27017/messageapp';
const mongo1 = connect(dbURL1);
const dbURL2 = 'mongodb://localhost:27018/messageapp';
const mongo2 = connect(dbURL2);

const cb = () => console.log('funciona')

mongo1.on(0, cb)

module.exports = { mongo1, mongo2 };

app.use(rateLimit);
app.use(bodyParser.urlencoded({ limit: '1mb', extended: false }));
app.use(bodyParser.json({ limit: '1mb' }));

app.listen(port, () => console.log(`Listening on port ${port}`));

const messageRouter = require('./routes/message');
app.use('/message', messageRouter);

const creditRouter = require('./routes/credit');
app.use('/credit', creditRouter);
