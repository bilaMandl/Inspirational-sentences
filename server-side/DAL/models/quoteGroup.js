const mongoose = require('mongoose');

const quoteGroupSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
});

const QuoteGroup = mongoose.model('quotegroups', quoteGroupSchema);

module.exports = QuoteGroup;