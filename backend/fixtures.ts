import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import * as crypto from "crypto";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
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


    await db.close();
};

run().catch(console.error);