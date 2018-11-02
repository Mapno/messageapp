const mongoose = require('mongoose');
const message = require('../message/models/Message');

class Database {
    constructor(dbURL) {
        this.dbURL = dbURL;
    };

    save(destination, body) {
            message.create({
                destination,
                body
            }).save()
        };

    connect() {
        return mongoose.connect(this.dbURL, { useNewUrlParser: true },(err) => {
            if (err) {
                console.error('Failed to connect to mongo - retrying in 5 sec', err);
                setTimeout(connectWithRetry, 5000);
            } else {
                console.log(`Connected to mongodb. DB name: ${this.dbURL}`)
            }
        });
    };
};

module.exports = Database;