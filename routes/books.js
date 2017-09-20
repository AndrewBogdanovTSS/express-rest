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
    .post((req, res)=>{
        console.log("body: ", req.body);
        let book = new BookModel(req.body);

        book.save();
        // 201 = created
        res.status(201).send(book);

    });

booksRouter.route('/:id')
    .get((req, res) => {
        BookModel.findById(req.params.id, (err, book) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(book);
            }
        });
    })
    .put((req, res)=> {
        BookModel.findById(req.params.id, (err, book) => {
            if (err) {
                res.status(500).send(err);
            } else {
                console.log("body: ", req.body);
                book.title = req.body.title;
                book.author = req.body.author;
                book.genre = req.body.genre;
                book.read = req.body.read;
                book.save();
                res.json(book);
            }
        });
    });