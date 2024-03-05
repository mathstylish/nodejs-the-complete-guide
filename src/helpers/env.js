const envalid = require('envalid')

const appEnv = envalid.cleanEnv(process.env, {
    PORT: envalid.port(),
    DB_HOST: envalid.str(),
    DB_USERNAME: envalid.str(),
    DB_PASSWORD: envalid.str(),
    DB_NAME: envalid.str(),
    MONGO_URI: envalid.str(),
    PINO_LOG_LEVEL: envalid.str({
        choices: ['fatal', 'error', 'warn', 'info', 'debug', 'trace'],
        default: 'info'
    })
})

module.exports = appEnv