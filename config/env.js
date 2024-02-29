const envalid = require('envalid')

const $env = envalid.cleanEnv(process.env, {
    APP_PORT: envalid.port(),
    DB_HOST: envalid.str(),
    DB_USER: envalid.str(),
    DB_PASSWORD: envalid.str(),
    DB_NAME: envalid.str(),
})

module.exports = $env