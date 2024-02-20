const path = require('node:path')
const rootDir = require('../utils/path')

const express = require('express')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express()

app.use(express.urlencoded({ extended: true }))

// instead of putting /admin in all routes, just put it here and all routes will have /admin/<route>
// note that you must explicitly put /admin/<route> in attributes such as the action of <form>
app.use('admin', adminRoutes)
app.use(shopRoutes)

app.use((req, res) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
})

app.listen(3000)