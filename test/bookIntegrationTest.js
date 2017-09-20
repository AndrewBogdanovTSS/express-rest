import 'babel-polyfill'
import should from 'should'
import request from 'supertest'
import {app} from '../index'
import mongoose from 'mongoose'

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book Crud Test', () => {
    it('Should allow a book to be posted and return a read and _id', (done) => {
        let bookPost = {title: 'New Book', author: 'Andrew', genre: 'Fiction'};

        agent.post('/api/books')
            .send(bookPost)
            .expect(200)
            .end((err, result)=>{
                result.body.read.should.equal(false);
                result.body.should.have.property('_id');
                done();
            });

    });

    afterEach((done)=>{
        Book.remove().exec();
        done();
    })
});