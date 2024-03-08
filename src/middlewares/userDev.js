const appEnv = require('../config/env')
const logger = require('../helpers/logger')
const User = require('../models/user')

const userDev = async (req, res, next) => {
    try {
        const user = await User.findById(appEnv.MONGO_DEV_USER_ID)
        req.user = user
        next()
    } catch (err) {
        logger.error('error when trying to insert dev user in application', { err, formatStackTrace: true })
    }
}

module.exports = userDev