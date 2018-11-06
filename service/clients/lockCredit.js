module.exports = (eventState, db) => {
    return require('../models/Credit')(db).findOneAndUpdate({}, { eventState }, { new: true })
        .then(response => console.log(`Event state update to ${eventState}`))
        .catch(err => {
            console.log('Error trying to update the event state', err);
            console.log('Retrying in 1sec');
            setTimeout(updateEventState, 1000);
        })
};