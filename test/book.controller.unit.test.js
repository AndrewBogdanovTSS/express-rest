import 'babel-polyfill'
import should from 'should'
import sinon from 'sinon'
import booksController from '../controllers/books.controller'

describe('Book controller tests: ', () => {
    describe('Post', () => {
        it('should not allow an empty title', () => {
            const Book = function (book) {
                this.save = function () {}
            };

            let req = {
                body: {
                    author: 'Andrew'
                }
            };

            let res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            booksController.post(req, res);

            res.status.calledWith(400).should.equal(true, 'Bad status ' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
        })
    })
});
