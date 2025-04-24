import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema({
    comment: {
        type: String
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel'
    },
})

export const Comment = mongoose.model('Comment', commentSchema); 