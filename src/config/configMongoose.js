const mongoose = require('mongoose');

const connectionString = `mongodb://localhost:27017/movies-app`;

function configMongoose() {
    return mongoose.connect(connectionString);
}

module.exports = configMongoose;