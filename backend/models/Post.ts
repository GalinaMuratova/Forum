import mongoose, { Schema} from 'mongoose';
import User from "./User";

const PostSchema = new Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: false,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => await User.findById(value),
            message: 'Author doesnt exist',
        }
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: String,
});

const Post = mongoose.model('Post', PostSchema);
export default Post;

