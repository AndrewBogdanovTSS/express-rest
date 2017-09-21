import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import {booksRouter} from './routes/books'

const port = process.env.PORT || 5001;
export const testPath = process.env.NODE_ENV === 'test' ? '_test' : '';
export const app = express();

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