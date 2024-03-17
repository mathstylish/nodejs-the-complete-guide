const appEnv = require("../config/env")
const pino = require("pino")

module.exports = pino({
    level: appEnv.PINO_LOG_LEVEL,
    base: undefined,
})
