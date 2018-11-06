const mongoose = require('mongoose');
const updateSecondaryCredit = require('../clients/updateSecondaryCredit');
const getCredit = require('../clients/getCredit');
const dbURL1 = 'mongodb://localhost:27017/messageapp';
const dbURL2 = 'mongodb://localhost:27018/messageapp';

const databases = {
    db1: {
        connection: {},
        status: false
    },
    db2: {
        connection: {},
        status: false
    },
    primary: true
};

const connect = (dbURL) => {
    return mongoose.createConnection(dbURL, { useNewUrlParser: true }, (err) => {
        if (err) {
            console.error('Failed to connect to mongo - retrying in 5 sec', err);
            setTimeout(connect, 5000);
        } else {
            console.log(`Connected to mongodb. DB name: ${dbURL}`)
        }
    });
};

let mongo1 = connect(dbURL1);
let mongo2 = connect(dbURL2);

const listenConnect = (db) => {
    return db.on('connected', () => {
        const port = db.port == 27017;

        port ? console.log('DB1 up and running') : console.log('DB2 up and running');

        if (port) {
            if (databases.db2.status)
                databases.primary = false;
            else
                databases.primary = true;

            databases.db1.connection = db;
            databases.db1.status = true;
        } else {
            if (databases.db1.status)
                databases.primary = true;
            else
                databases.primary = false;

            databases.db2.connection = db;
            databases.db2.status = true;
        }
    })
};

const listenReconnect = (db) => {
    return db.on('reconnect', () => {
        const port = db.port == 27017;

        if (port) {
            getCredit(databases.db2.connection)
                .then(credit => updateSecondaryCredit(credit.amount, db));
            
        } else {
            getCredit(databases.db1.connection)
                .then(credit => updateSecondaryCredit(credit.amount, db));
        }
    });
};

const listenDisonnect = (db) => {
    return db.on('disconnected', () => {
        const port = db.port == 27017;

        port ? console.log('DB1 disconnected') : console.log('DB2 disconnected');

        if (port) {
            if (databases.db2.status)
                databases.primary = false;

            databases.db1.status = false;
        } else {
            if (databases.db1.status)
                databases.primary = true;

            databases.db2.status = false;
        }
    })
}

const listenDB = (mongo1, mongo2) => {
    listenConnect(mongo1);  
    listenConnect(mongo2);
    listenDisonnect(mongo1);
    listenDisonnect(mongo2);
    listenReconnect(mongo1);
    listenReconnect(mongo2);
}

module.exports = { connect, listenDB, listenConnect, listenDisonnect, databases, mongo1, mongo2 };