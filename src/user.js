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
        type: Schema.Types.ObjectId, //refer to BlogPost model
        ref: 'blogPost'
    }]
});

//virtual fields
UserSchema.virtual('postCount').get(function() {
    return this.posts.length;
});

//user middleware
UserSchema.pre('remove', function(next) {
    const BlogPost = mongoose.model('blogPost'); //avoid cyclical require
    //clean up user's blogposts and comments
    // this === whichever user is being removed
    BlogPost.remove({ _id: {$in: this.blogPosts }}) //remove every blogpost associated with this user
        .then(() => next());
});

const User = mongoose.model('user', UserSchema); //initialize collection and Class based on UserSchema

module.exports = User;