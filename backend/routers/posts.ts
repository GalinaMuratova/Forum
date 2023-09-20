import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose from "mongoose";
import Post from "../models/Post";
import {imagesUpload} from "../multer";

const postsRouter = express.Router();

postsRouter.get('/', async (req,res) => {
   try {
       const posts = await Post.find().populate('author', 'username').sort({ date: -1 });
       return res.send(posts);
   } catch {
       return res.sendStatus(500);
   }
});

postsRouter.get('/:id', async (req,res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username');
        if (!post) {
            return res.sendStatus(404);
        }
        return res.send(post);
    } catch {
        return res.sendStatus(500);
    }
});

postsRouter.post('/', auth, imagesUpload.single('image'), async(req, res, next) => {
   try {
       const user = (req as RequestWithUser).user;
       const currentDate = new Date();

       const posts = new Post ({
           author: user._id,
           title: req.body.title,
           description: req.body.description,
           image: req.file? req.file.filename:null,
           date: currentDate
       });
       await posts.save();
       return res.send(posts);

   } catch (e) {
       if (e instanceof mongoose.Error.ValidationError) {
           return res.status(400).send(e);
       }
       next(e);
   }
});

export default postsRouter;