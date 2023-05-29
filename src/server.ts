import mongoose from "mongoose";
import app from "./app";
import config from "./config";



const databaseConnected = async () => {
    try {
        await mongoose.connect(config.databaseURL as string);
        console.log(`⌛ database is connected successfully`);
        app.listen(config.port, () => {
            console.log(`Application listening on port ${config.port}`)
        })
    } catch (error) {
        console.log('Failed to connected database', error);
    }
}

databaseConnected()