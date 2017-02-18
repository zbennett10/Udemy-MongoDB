const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Model Association', () => {
    let joe, blogPost, comment;

    //before each test - do this
    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is'});
        comment = new Comment({ content: 'Congrats on great post'});

        //associate models
        joe.blogPosts.push(blogPost); //mongoose recognizes that we are pushing an entire model
        blogPost.comments.push(comment);
        comment.user = joe;

        //done will be called when all three promises are completed
        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });

    it('saves a relation between a user and a blogpost', (done) => {
        User.findOne({name: 'Joe'})
            .populate('blogPosts') //load any associated blogposts (blogpost is a model of its own) that are contained with blogPosts property
            .then((user) => {
                assert(user.blogPosts[0].title === 'JS is Great');
                done();
            });
    });

    it('saves a full relation graph', (done) => {
        User.findOne({ name: 'Joe'})
            .populate({
                path: 'blogPosts',  //nested associations
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.name === 'Joe');
                assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
                assert(user.blogPosts[0].comments[0].user.name === 'Joe');
                done();
            });
    });
});