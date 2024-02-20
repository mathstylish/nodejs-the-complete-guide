const express = require('express')

const path = require('node:path')
const rootDir = require('./utils/path')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(rootDir, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(rootDir, 'public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

app.listen(3000)