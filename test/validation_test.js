const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
    //causing error to be thrown and making sure error message matches
    it('requires a user name', () => {
        const user = new User({
            name: undefined
        });
        const validationResult = user.validateSync();
        const message = validationResult.errors.name.message;
        assert(message === 'Please provide a name.');
    });

    //causing error to be thrown and making sure error message matches
    it('requires a user name longer than 2 characters', () => {
        const user = new User({
            name: 'Al'
        });
        const validationResult = user.validateSync();
        const message = validationResult.errors.name.message;
        assert(message === 'Name must be longer than 2 characters.');
    });

    if('disallows invalid records from being saved', (done) => {
        const user = new User({ name: 'Al'});
        user.save()
            .catch((validationResult) => {
                const {message} = validationResult.errors.name;
                assert(message === 'Name must be longer than 2 characters.');
            });
        done();
    });
});