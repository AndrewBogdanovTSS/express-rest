import express from "express";
import bookController from '../controllers/book'
import booksController from '../controllers/books'

export const booksRouter = express.Router();

booksRouter.route('/')
    .get((req, res) => {
        booksController.get(req, res);
    })
    .post((req, res) => {
        booksController.post(req, res);
    });

//Alternative way of using middleware
/*booksRouter.use('/:id', (req, res, next) => {
    bookController.getBook(req, res, next);
});*/

booksRouter.route('/:id')
    .all((req, res, next) => {
        bookController.getBook(req, res, next);
    })
    .get((req, res) => {
        bookController.get(req, res);
    })
    .put((req, res) => {
        bookController.put(req, res);
    })
    .patch((req, res) => {
        bookController.patch(req, res);
    })
    .delete((req, res) => {
        bookController.remove(req, res);
    });