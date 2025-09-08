const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    text: { type: String, required: true },
    title: { type: String, required: true },
    groupId: { type: Number, required: true },
    priority: { type: Number, required: true },
    status: { type: Boolean, required: true }
});

const Quote = mongoose.model('quotes', quoteSchema);

module.exports = Quote;