import mongoose from "mongoose"

import app from "./app.js"
import appEnv from "./config/env.js"
import logger from "./helpers/logger.js"

const init = async () => {
    try {
        await mongoose.connect(appEnv.MONGO_URI)
        app.listen(appEnv.PORT, () => {
            logger.info(`application started`)
        })
    } catch (err) {
        logger.error(err, "error on starting server")
    }
}

init()
