const envalid = require('envalid')

const appEnv = envalid.cleanEnv(process.env, {
    PORT: envalid.port(),
    DB_HOST: envalid.str({ default: '' }),
    DB_USERNAME: envalid.str({ default: '' }),
    DB_PASSWORD: envalid.str({ default: '' }),
    DB_NAME: envalid.str({ default: '' }),
    MONGO_URI: envalid.str({ default: '' }),
    PINO_LOG_LEVEL: envalid.str({
        choices: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'],
        default: 'info'
    }),
    NODE_ENV: envalid.str({ choices: ['development', 'production', 'test', 'staging'] })
})

module.exports = appEnv