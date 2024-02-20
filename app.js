const http = require('node:http')

const routes = require('./routes')

const handler = (req, res) => {
    const { url, method } = req
    const routeKey = `${url}:${method.toLowerCase()}`
    const chosen = routes[routeKey] || routes.default
    chosen(req, res)
    return;
}

const server = http.createServer(handler)

server.listen(3000)