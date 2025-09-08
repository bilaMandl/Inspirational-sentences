const mongoose = require('mongoose');

const artSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    userId: { type: Number, required: true },
    famous: { type: Boolean, required: true },
    priority: { type: Number, required: true },
    backroundId: { type: Number, required: true },
    textId: { type: Number, required: true },
    url: { type: String, require: true }
});

const Art = mongoose.model('arts', artSchema);

module.exports = Art;




