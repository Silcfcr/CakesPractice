const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    stars: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    UpdatedAt: {
        type: String,
        type: Date,
        default: Date.now
    }
});

const comment = mongoose.model('comments', commentSchema);

const commentModel = {
    createComment: function (newComment) {
        return comment.create(newComment);
    }
};

module.exports = { commentSchema, commentModel };
