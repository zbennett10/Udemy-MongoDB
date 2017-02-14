const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./postSchema');

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message:"Name must be longer than 2 characters."
        },
        required: [true, 'Please provide a name.']
    },
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectID, //refer to BlogPost model
        ref: 'blogPost'
    }]
});

//virtual fields
UserSchema.virtual('postCount').get(function() {
    return this.posts.length;
});

const User = mongoose.model('user', UserSchema); //initialize collection and Class based on UserSchema

module.exports = User;