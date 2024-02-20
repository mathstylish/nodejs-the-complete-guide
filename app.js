const path = require('node:path')
const rootDir = require('./utils/path')
const express = require('express')

const handlebars = require('express-handlebars')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express()

// plug handlebars as express engine. Pug integration comes with express, handlebars not
app.engine('hbs', handlebars.engine({ extname: 'hbs', defaultLayout: false }))
// set template engine as handlebars
app.set('view engine', 'hbs')
// set views/handlebars as template files directory
app.set('views', path.join(rootDir, 'views', 'handlebars'))

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(rootDir, 'public')))

app.use('/admin', adminData.router)
app.use(shopRoutes)

app.use((req, res) => {
    res.status(404).render('404', { pageTitle: 'Not Found' })
})

app.listen(3000)