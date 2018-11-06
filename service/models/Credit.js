const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creditSchema = new Schema({
    amount: Number,
    eventState: Boolean
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

module.exports = (db) => db.model('CreditSchema', creditSchema);