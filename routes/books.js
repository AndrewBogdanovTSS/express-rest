import express from "express";
import BookModel from '../models/book'

export const booksRouter = express.Router();

booksRouter.route('/')
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

    })
    .post((req, res) => {
        console.log("body: ", req.body);
        let book = new BookModel(req.body);

        book.save();
        // 201 = created
        res.status(201).send(book);

    });

booksRouter.use('/:id', (req, res, next) => {
    BookModel.findById(req.params.id, (err, book) => {
        if (err) {
            res.status(500).send(err);
        } else if (book) {
            req.book = book;
            next();
        } else {
            res.status(404).send('No Book Found');
        }
    });
});

function saveBook(req, res, next) {
    req.book.save().then((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(req.book);
            if(next)next();
        }
    });
}

booksRouter.route('/:id')
    .get((req, res) => {
        res.json(req.book);
    })
    .put((req, res) => {
        let book = req.book;
        book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.genre;
        book.read = req.body.read;
        saveBook(req, res);
    })
    .patch((req, res) => {
        let book = req.book;
        if (book._id) delete book._id;
        for (let key in req.body) book[key] = req.body[key];
        saveBook(req, res);
    });