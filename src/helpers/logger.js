import appEnv from "../config/env.js"
import pino from "pino"

const logger = pino({
    level: appEnv.PINO_LOG_LEVEL,
    base: undefined,
})

export default logger
