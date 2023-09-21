import mongoose, { Schema} from "mongoose";
import User from "./User";
import Post from "./Post";


const CommentSchema = new Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => await User.findById(value),
            message: 'Author doesnt exist',
        }
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => await Post.findById(value),
            message: 'There is not such post ',
        }
    },
    text: {
        type: String,
        required: true
    }
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;