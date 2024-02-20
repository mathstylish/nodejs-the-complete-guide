const express = require('express')
const path = require('node:path')

const rootdir = require('./helpers/path')

const usersRoutes = require('./routes/users')
const homeRoutes = require('./routes/home')

const app = express()

app.use(express.static(path.join(rootdir, 'public')))

app.use(usersRoutes)
app.use(homeRoutes)

app.use((req, res) => {
    res.status(404).sendFile(path.join(rootdir, 'views', '404.html'))
})

app.listen(3000)