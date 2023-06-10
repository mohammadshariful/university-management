import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { logger, errorLogger } from "./shared/logger";



const databaseConnected = async () => {
    try {
        await mongoose.connect(config.databaseURL as string);
        logger.info(`⌛ database is connected successfully`)
        app.listen(config.port, () => {
            logger.info(`Application listening on port ${config.port}`)
        })
    } catch (error) {
        errorLogger.error('Failed to connected database', error)
    }
}

databaseConnected()