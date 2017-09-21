import BookModel from '../models/book'

function get(req, res) {
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
            let returnBooks = [];
            books.forEach((el, i, arr)=>{
                let newBook = el.toJSON();
                let selfLink = `http://${req.headers.host}/api/books/${newBook._id}`.replace(' ', '%20');
                newBook.links = {};
                newBook.links.self = selfLink;
                returnBooks.push(newBook);
            });
            res.json(returnBooks);
        }
    });
}

function post(req, res) {
    let book = new BookModel(req.body);

    if (!req.body.title) {
        res.status(400);
        res.send('Title is required');
    } else {
        book.save();
        // 201 = created
        res.status(201);
        res.send(book);
    }
}

export default {get, post}