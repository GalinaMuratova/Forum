import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import * as crypto from "crypto";
import Post from "./models/Post";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;
    const currentDate = new Date();

    try {
        await db.dropCollection('users');
        await db.dropCollection('posts');
    } catch (e) {
        console.log('Collection not deleted')
    }
    const [user1, user2] = await User.create({
        username: 'Anna',
        password:'123',
        token:crypto.randomUUID()
    }, {
        username: 'Bob',
        password:'456',
        token:crypto.randomUUID()
    });
    await Post.create({
       author: user1._id,
       title: 'Some text',
       description: 'Something',
       image: null,
       date: currentDate
    }, {
        author: user1._id,
        title: 'Another text',
        description: 'Lorem collagen peptides',
        image: null,
        date: currentDate
    }, {
        author: user2._id,
        title: 'Books newspapers',
        description: 'Hands to myself',
        image: null,
        date: currentDate
    }, {
        author: user2._id,
        title: 'Bad romance',
        description: 'Just dance',
        image: null,
        date: currentDate
    });

    await db.close();
};

run().catch(console.error);