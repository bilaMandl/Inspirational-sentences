const mongoose = require('mongoose');

const backgroudSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    url: { type: String, required: true },
    name: { type: String, required: true }
});

const Backgroud = mongoose.model('backgrouds', backgroudSchema);

module.exports = Backgroud;
