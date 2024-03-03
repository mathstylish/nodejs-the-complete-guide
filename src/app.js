const express = require('express')

const $env = require('./config/env')
const path = require('./utils/path')

const sequelize = require('./config/sequelize.config.js')

const adminRoutes = require('./routes/admin.route.js')
const shopRoutes = require('./routes/shop.route.js')
const errorController = require('./controllers/error.controller.js')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.pathTo('views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.pathTo('public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

sequelize
    .sync()
    .then(result => {
        app.listen($env.APP_PORT)
    })
    .catch(err => console.log(err))
