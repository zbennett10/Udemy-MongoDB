const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('can create a subdocument', (done) => {
        const joe = new User({
            name: 'Joe', 
            posts: [{title: "Poop"}]
        });

        joe.save()
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user.posts[0].title === 'Poop');
            });
        done();
    });

    it('can add subdocuments to an existing record', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: []
        });
        joe.save()
            .then(()=> User.findOne({name: 'Joe'}))
            .then((user) => {
                user.posts.push({title: 'New Post'}); //add post to joe
                return user.save();
            })
            .then(() => User.findOne({name: 'Joe'})) //fetch joe again and assert post is there
            .then((user) => {
                assert(user.posts[0].title = 'New Post');
            });
            done();
    });

    it('can remove an existing subdocument', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{title: 'New Title'}]
        });
        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                user.posts[0].remove();
                return user.save();
            })
            .then(() => user.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user.posts.length === 0);
            });
            done();
    });
});