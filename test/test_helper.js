//code to setup test environment
const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // transfer deprecated mongoose promise to ES6 Promises

//executed one time before test suite
before((done) => {
    mongoose.connect('mongodb://localhost/users_test');
    mongoose.connection
        .once('open', () => {done();})
        .on('error', (error) => {
            console.warn('warning', error);
        });
});



//will run before each test statement
beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        //ready to run next test
        done(); //users have been dropped - mocha's call to continue
    }); //delete every use in database
});