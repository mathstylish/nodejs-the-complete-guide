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
        body: req.body,
        query: req.query
    }
    if (req.user) {
        request.user = {
            id: req.id,
            name: req.name
        }
    }
    request.server = {
        ip: req.ip
    }
    return request
}

const extractErrorInfo = (error, prettyStack) => {
    const errorInfo = {}
    errorInfo.thrownBy = error.name
    errorInfo.reason = error.message
    if (prettyStack) {
        errorInfo = error.stack.split('\n').map(line => line.trim()) || null
    } else {
        errorInfo.stack = error.stack
    }
    return errorInfo
}

exports.error = (message, errObj, reqObj, { prettyStack = false } = {}) => {
    const timeStamp = new Date().toISOString()
    const logResponse = {
        timeStamp: timeStamp,
        errorType: 'application error'
    }
    if (reqObj) {
        logResponse.reqInfo = extractRequestInfo(reqObj)
    }
    if (errObj) {
        logResponse.errorInfo = extractErrorInfo(errObj, prettyStack)
    }
    return log.error(logResponse, message)
}

exports.info = (message, anObj, reqObj) => {
    const logResponse = {}
    if (anObj) {
        logResponse.data = anObj
    }
    if (reqObj) {
        logResponse.request = extractRequestInfo(reqObj)
    }
    return log.info(logResponse, message)
}

exports.debug = (message, anObj, reqObj) => {
    const logMessage = {}
    if (anObj) {
        logMessage.data = anObj
    }
    if (reqObj) {
        logResponse.reqInfo = extractRequestInfo(reqObj)
    }
    return log.debug(logMessage, message)
}