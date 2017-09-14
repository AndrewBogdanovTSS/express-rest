import express from "express";
import BookModel from '../models/book'

export const booksRouter = express.Router();

booksRouter.route('/books')
    .get((req, res) => {
        let filterArr = ['genre', 'author'];
        let query = {};
        for (var i = 0; i < filterArr.length; i++) {
            let criteria = filterArr[i];
            if (req.query[criteria]) query[criteria] = req.query[criteria];
        }
        BookModel.find(query, (err, books) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(books);
            }
        });

    });

booksRouter.route('/books/:id')
    .get((req, res) => {
        BookModel.findById(req.params.id, (err, book) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(book);
            }
        });

    });