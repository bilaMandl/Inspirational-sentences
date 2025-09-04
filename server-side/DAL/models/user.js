const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true ,unique: true},
    password: { type: String, required: true },
    mail: { type: String, required: true },
    suggestions: { type: Array, required: true },
    myBackgrounds: { type: Array, required: true },
    myArts: { type: Array, required: true },
    myQuotes: { type: Array, required: true }

});

const User = mongoose.model('users', userSchema);

module.exports = User;



