import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import {booksRouter} from './routes/books'

const app = express();
const port = process.env.PORT || 5001;
const db = mongoose.connect('mongodb://localhost/book_db');

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/books', booksRouter);

app.get('/', (req, res)=>{
    res.send('Welcome to the jungle!');
});

app.listen(port, (err)=>{
    console.log(`Running on port: ${port}`);
});