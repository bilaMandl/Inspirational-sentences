const { config } = require('dotenv');
const mongoose = require('mongoose');

const uri = config().parsed.MONGO_URL;

const connection = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connection to MongoDB successful');
    } catch (error) {
        console.error('Connection to MongoDB failed:', error);
    }
};

module.exports = connection;