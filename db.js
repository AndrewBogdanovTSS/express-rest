import mongoose from 'mongoose'
import config from './config.json'

const dbConfig = process.env.NODE_ENV === 'test' ? config.db.test : config.db.dev;
const dbURI = `mongodb://${dbConfig.user}:${dbConfig.password}@${dbConfig.server}:${dbConfig.port}/${dbConfig.name}`;

mongoose.Promise = global.Promise;

mongoose.connect(dbURI, {
    useMongoClient: true
}).then(
    () => {
        // When successfully connected
        console.log('Mongoose default connection open to ' + dbURI);
    },
    (err) => {
        console.log('Mongoose default connection error: ' + err);
    }
);

// CONNECTION EVENTS
// First two events can be replaced with a Promise. Example above.
// When successfully connected
/*mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err);
});*/

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});