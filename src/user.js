const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message:"Name must be longer than 2 characters."
        },
        required: [true, 'Please provide a name.']
    },
    postCount: Number
});

const User = mongoose.model('user', UserSchema); //initialize collection and Class based on UserSchema

module.exports = User;