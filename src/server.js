const { mongoConnect } = require('./config/mongo.config.js')
const app = require('./app');
const appEnv = require('./config/env')
const logger = require('./helpers/logger')

const init = async () => {
    try {
        await mongoConnect()
        app.listen(appEnv.PORT, () => {
            logger.info(`application started`)
        })
    } catch (err) {
        logger.error(err, 'error on starting server')
    }
}

init()