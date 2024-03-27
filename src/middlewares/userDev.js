import appEnv from "../config/env.js"
import logger from "../helpers/logger.js"
import User from "../models/user.js"

const userDev = async (req, res, next) => {
    try {
        const user = await User.findById(appEnv.MONGO_DEV_USER_ID)
        req.user = user
        next()
    } catch (err) {
        logger.error(err)
    }
}

export default userDev
