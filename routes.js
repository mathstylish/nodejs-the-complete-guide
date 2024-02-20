const routes = {
  '/users:get': (_, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write('<ul><li>user 1</li><li>user 2</li><li>user 3</li><li>user 4</li><li>user 5</li></ul>')
      res.end()
  },

  '/create-user:post': (req, res) => {
      const body = []
      req.on('data', chunk => {
          body.push(chunk)
      })

      req.on('end', () => {
          const parsedBody = Buffer.concat(body).toString()
          const message = parsedBody.split('=')[1]
          console.log(message)
          res.writeHead(302, { 'Location': '/users' })
          res.end()
      })
  },

  default: (_, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write("Greetings!")
      res.write('<form action="/create-user" method="post"><input type="text" name="username"><button type="submit">Send</button></form>')
      res.end()
  }
}

module.exports = routes;