import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose from "mongoose";
import Post from "../models/Post";
import {imagesUpload} from "../multer";

const postsRouter = express.Router();

postsRouter.post('/', auth, imagesUpload.single('image'), async(req, res, next) => {
   try {
       const userNew = (req as RequestWithUser).user;
       const posts = new Post ({
           user: userNew._id,
           title: req.body.title,
           description: req.body.description,
           image: req.file? req.file.filename:null,
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