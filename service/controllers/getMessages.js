const findAllMessages = require('../clients/findAllMessages');

module.exports = (req, res, databases) => {
    let db;
    if(databases.primary)
        db = databases.db1.connection;
    else
        db = databases.db2.connection;

    console.log(db)

    findAllMessages(db)
        .then(messages => res.status(200).send(messages))
        .catch(err => console.log('Error fetching messages from db', err));
}