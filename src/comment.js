const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
    content: String,
    user: { 
        type: Schema.Types.ObjectId, //refer to user model
        ref: 'user'
    }
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;