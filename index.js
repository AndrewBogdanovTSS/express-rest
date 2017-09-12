import express from 'express'
import {booksRouter} from './routes/books'
import mongoose from 'mongoose'

const app = express();
const port = process.env.PORT || 5001;

app.use('/api', booksRouter);

app.get('/', (req, res)=>{
    res.send('Welcome to the jungle!');
});

app.listen(port, (err)=>{
    console.log(`Running on port: ${port}`);
});