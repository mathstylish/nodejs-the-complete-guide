const express = require('express')

const $env = require('./config/env')

const path = require('./utils/path')

const adminRoutes = require('./routes/admin.route.js')
const shopRoutes = require('./routes/shop.route.js')
const errorController = require('./controllers/error.controller.js')

const db = require('./database/connection')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.pathTo('views'))

db.execute('SELECT * FROM products')
    .then(console.log)
    .catch(err => {
        if (err instanceof Error) {
            console.log(`An error was occurred: ${err}`)
        }
    })

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.pathTo('public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

app.listen($env.APP_PORT)