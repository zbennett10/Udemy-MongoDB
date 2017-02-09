const User = require('../src/user');
const assert = require('assert');

describe('deleting users from the database', () => {
    let joe;
    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        joe.save()
            .then(() => done());
    });

    it('remove user by instance', (done) => {
        joe.remove()
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(!user);
                done();
            });
    });

    it('remove user by class', (done) => {
        //remove a bunch of records at one time
        User.remove({name: 'Joe'})
            .then(() => User.findOne({name: 'Joe'}))
            .then((users) => {
                assert(!users);
                done();
            });
    });

    it('remove user by class with findOneAndRemove', (done) => {
        //search by criteria and remove the first one
        User.findOneAndRemove({name: 'Joe'})
            .then(() => User.findOne({name: 'Joe'}))
            .then((users) => {
                assert(!users);
                done();
            })
    });

    it('remove user by class with findByIdAndRemove', (done) => {
        User.findByIdAndRemove(joe._id)
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(!user);
                done();
            })
    });
});