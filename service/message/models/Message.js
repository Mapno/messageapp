const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    destination: String,
    body: String,
    wasSent: Boolean,
    isConfirmed: Boolean
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

module.exports = mongoose.model('Message', messageSchema);