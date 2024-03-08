const { getDb, parseIdFromHexString } = require('../config/mongo.config')
const logger = require('../helpers/logger')

class User {
    constructor(username, email) {
        this.username = username
        this.email = email
    }

    async save() {
        try {
            logger.info('Saving user. Received user object:', { data: this })
            const db = getDb()
            const user = await db.collection('users').insertOne(this)
            logger.info('User saved successfully. Saved user object:', { data: user })
        } catch (err) {
            logger.error('save(): Error when trying to save user', { err, formatStackTrace: true })
        }
    }

    static async findById(id) {
        try {
            logger.info(`findById(): Searching for user with id: ${id} [${typeof id}]`)
            const db = getDb()
            const user = await db.collection('users').findOne({ _id: parseIdFromHexString(id) })
            logger.info(`findById(): User ${user._id} [${typeof user._id}] retrieved from database. User object:`, { data: user })
            return user
        } catch (error) {
            logger.error('findById(): Error when trying to get user', { error, formatStackTrace: true })
        }
    }
}

module.exports = User
