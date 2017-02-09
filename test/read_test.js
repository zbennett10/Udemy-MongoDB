const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let joe;
    //add user to database
    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        joe.save() //save user
            .then(() => done());//continue testing after save complete
    });

    it('finds all users with a name of joe', (done) => {
        User.find({name: 'Joe'})
            .then((users) => {
                assert(users[0]._id.toString() === joe.id.toString());
                done();
            });
    });

    it('finds user with particular id', (done)=> {
        User.findOne({ _id: joe.id })
            .then((user) => {
                assert(user.name === joe.name);
                done();
            });
    });
});


    

