import express from "express";

const app = express();

export const booksRouter = express.Router();

booksRouter.route('/books')
    .get((req, res)=> {
        res.json({
            hello: 'This is my API'
        });
    });

