import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose from "mongoose";
import Comment from "../models/Comment";

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res) => {
    try {
        const comments = await Comment.find().populate('author', 'username');
        res.send(comments);
    } catch {
        return res.sendStatus(500);
    }
});

commentsRouter.post('/', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const comment = new Comment ({
            author: user._id,
            post: req.body.post,
            text: req.body.text
        });

        await comment.save();
        return res.send(comment);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        next(e);
    }
});

export default commentsRouter;