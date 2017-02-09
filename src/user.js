const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    postCount: Number
});

const User = mongoose.model('user', UserSchema); //initialize collection and Class based on UserSchema

module.exports = User;