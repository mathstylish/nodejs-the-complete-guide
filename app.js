const http = require('http')

const someReqInfo = (req, res) => {
    let { headers: { host, accept }, method, statusCode, statusMessage } = req
    statusCode = 200
    statusMessage = 'Fetching some request fields'
    const userAgent = req.headers['user-agent']
    console.log({
        host,
        userAgent,
        accept,
        method,
        statusCode,
        statusMessage
    })
}

const server = http.createServer(someReqInfo)

server.listen(3000)
