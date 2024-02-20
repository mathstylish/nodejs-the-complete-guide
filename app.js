const path = require('node:path')
const rootDir = require('./utils/path')
const express = require('express')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express()

// set views as template files directory
app.set('views', path.join(rootDir, 'views'))
// set template engine as pug
app.set('view engine', 'pug')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(rootDir, 'public')))

app.use('/admin', adminData.router)
app.use(shopRoutes)

app.use((req, res) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
})

app.listen(3000)