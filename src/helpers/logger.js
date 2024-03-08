const appEnv = require('../config/env')
const pino = require('pino')

const log = pino({
    level: appEnv.PINO_LOG_LEVEL,
    base: undefined,
    formatters: {
        level: (label) => {
            return { level: label.toUpperCase() }
        }
    }
})

const extractRequestInfo = (req) => {
    const request = {
        method: req.method,
        path: req.path,
        server: {
            ip: req.ip
        },
        ...(req.body && Object.keys(req.body).length > 0 && { body: req.body }),
        ...(req.query && Object.keys(req.query).length > 0 && { query: req.query }),
        ...(req.user && req.user.id && req.user.name && { user: { id: req.user.id, name: req.user.name } }),
    }

    return request
}

const extractErrorInfo = (error, formatStackTrace) => {
    const errorInfo = {
        thrownBy: error.name,
        reason: error.message
    }

    if (formatStackTrace) {
        errorInfo.stack = error.stack.split('\n').map(line => line.trim()) || null
    } else {
        errorInfo.stack = error.stack
    }

    return errorInfo
}

const logFunc = (level, message, { data, request } = {}) => {
    const logResponse = {}

    if (data) {
        logResponse.data = data
    }

    if (request) {
        logResponse.reqInfo = extractRequestInfo(request)
    }

    return log[level](logResponse, message)
}

exports.fatal = (message, { errorObject, formatStackTrace = false, request } = {}) => {
    const timeStamp = new Date().toISOString()
    const logResponse = {
        timeStamp: timeStamp,
        errorType: 'application error'
    }

    if (request) {
        logResponse.reqInfo = extractRequestInfo(request)
    }

    if (errorObject) {
        logResponse.errorInfo = extractErrorInfo(errorObject, formatStackTrace)
    }

    return log.fatal(logResponse, message)
}

exports.error = (message, { errorObject, formatStackTrace = false, request } = {}) => {
    const timeStamp = new Date().toISOString()
    const logResponse = {
        timeStamp: timeStamp,
        errorType: 'application error'
    }

    if (request) {
        logResponse.reqInfo = extractRequestInfo(request)
    }

    if (errorObject) {
        logResponse.errorInfo = extractErrorInfo(errorObject, formatStackTrace)
    }

    return log.error(logResponse, message)
}

exports.info = (message, options) => logFunc('info', message, options)
exports.warn = (message, options) => logFunc('warn', message, options)
exports.debug = (message, options) => logFunc('debug', message, options)
exports.trace = (message, options) => logFunc('trace', message, options)
