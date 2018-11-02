const mongoose = require('mongoose');
const message = require('../models/Message');

class Database {
    constructor() {
        this.connection = mongoose.connect('mongodb://localhost:27017/messageapp', {
            useNewUrlParser: true
        }).then(db => console.log(`Connected to mongodb. DB name: ${db}`))
            .catch(err => console.log('Error connecting to mongodb', err))

        this.save = (destination, body) => {
            message.create({
                destination,
                body
            }).save()
        };
    };
};