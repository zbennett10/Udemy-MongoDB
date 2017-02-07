const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    it('saves a user', (done) => {
        const joe = new User({ //create user instance
            name: 'Joe'
        });

        joe.save()
            .then(() => {
                assert(!joe.isNew); //determine whether joe has been saved to database or not
                done();//signal to mocha that this it statement is done
            }); //use mongoose to save joe to the database
    });
});

