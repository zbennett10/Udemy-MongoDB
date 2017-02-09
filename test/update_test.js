const User = require('../src/user');
const assert = require('assert');

describe('update records within the database', () => {
    let joe;
    beforeEach((done) => {
        joe = new User({
            name: 'Joe'
        });
        joe.save().then(() => done());
    })

    //helper function
    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                done();
            });
    }

    it('instance type using set n save', (done) => {
        joe.set('name', 'Alex'); //good 
        assertName(joe.save(), done);
        
    });

    it('instance can update', (done) => {
        assertName(joe.update({name: 'Alex'}), done);
    });

    it('model can update', (done) => {
        assertName(User.update({name: 'Joe'}, {name: 'Alex'}),done);
    });

    it('model can update one record', (done) => {
        assertName(
            User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}),
            done
        );
    });

    it('model can find record with id and update', (done) => {
        assertName(
            User.findByIdAndUpdate(joe.id, {name: 'Alex'}),
            done
        );
    });

});