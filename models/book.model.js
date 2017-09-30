import mongoose from 'mongoose'

const Schema = mongoose.Schema;


const model = new Schema({
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

export default mongoose.model('Book', model)

// console.log("db.model: ", db.model('Book', model));