import './db'
import logger from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'
import {booksRouter} from './routes/books.route'

const port = process.env.PORT || 5001;
export const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/books', booksRouter);

app.get('/', (req, res)=>{
    res.send('Welcome to the jungle!');
});

app.listen(port, (err)=>{
    console.log(`Running on port: ${port}`);
});