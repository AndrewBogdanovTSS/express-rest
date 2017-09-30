import BookModel from '../models/book.model'

function get(req, res) {
    let returnBook = req.book.toJSON();
    let genreLink = `http://${req.headers.host}/api/books/?genre=${returnBook.genre}`.replace(' ', '%20');

    returnBook.links = {
        filterByGenre: genreLink,
        allBooks: `http://${req.headers.host}/api/books/`
    };
    res.json(returnBook);
}

function post(req, res) {
//    not needed right now
}

function put(req, res) {
    let book = req.book;
    book.title = req.body.title;
    book.author = req.body.author;
    book.genre = req.body.genre;
    book.read = req.body.read;
    saveBook(req, res);
}

function patch(req, res) {
    let book = req.book;
    if (book._id) delete book._id;
    for (let key in req.body) book[key] = req.body[key];
    saveBook(req, res);
}

function remove() {
    req.book.remove().then((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(204).send('Book removed');
        }
    });
}

function getBook(req, res, next) {
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
}

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

export default {get, post, put, patch, remove, getBook}