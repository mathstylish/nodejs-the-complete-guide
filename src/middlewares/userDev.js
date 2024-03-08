const appEnv = require('../config/env')
const logger = require('../helpers/logger')
const User = require('../models/user')

const userDev = async (req, res, next) => {
    try {
        const user = await User.findById(appEnv.MONGO_DEV_USER_ID)
        req.user = new User(user.username, user.email, user.cart, user._id)
        next()
    } catch (err) {
        logger.error('error when trying to insert dev user in application', { err, formatStackTrace: true })
    }
}

module.exports = userDev