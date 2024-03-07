const { mongoConnect } = require('./config/mongo.config.js')
const app = require('./app');
const appEnv = require('./config/env')
const logger = require('./helpers/logger')

const init = async () => {
    try {
        await mongoConnect()
        app.listen(appEnv.PORT, () => {
            logger.info(`application listening requests on http://localhost:${appEnv.PORT}`)
        })
    } catch (err) {
        logger.error('error on starting server', err, { prettyStack: true })
    }
}

init()