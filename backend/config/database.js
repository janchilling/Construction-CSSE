// database connection according to the singleton design pattern

const mongoose = require('mongoose');

let dbConnection = null;

function connectToDatabase(dbUrl) {
    if (!dbConnection) {
        dbConnection = mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        mongoose.connection.on('connected', () => {
            console.log("Connected to MongoDB");
        });

        mongoose.connection.on('error', (err) => {
            console.error(`MongoDB connection error: ${err}`);
        });
    }

    return dbConnection;
}

module.exports = connectToDatabase;
