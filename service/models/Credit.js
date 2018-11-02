const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creditSchema = new Schema({
    amount: Number
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

module.exports = mongoose.model('CreditSchema', creditSchema);