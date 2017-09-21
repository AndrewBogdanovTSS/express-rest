import mongoose from 'mongoose'
import {testPath} from '../index'

const connection = mongoose.createConnection('mongodb://localhost/book_db' + testPath);

connection.on('error', () => {
    console.log('Error! Database connection failed.');
});

connection.once('open', () => {
    console.log('Database connection established!');
    Object.keys(connection.models).forEach((collection) => {
        // You can get the string name.
        console.log("collection:", connection.models[collection]);
        // Or you can do something else with the model.
        // connection.models[collection].remove({});
    });
});

const schema = new mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    genre: {
        type: String
    },
    read: {
        type: Boolean,
        default: false
    }
});

export default connection.model('Book', schema);