const path = require('node:path')
const rootDir = require('./utils/path')
const express = require('express')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express()

// set template engine as ejs
app.set('view engine', 'ejs')
// set views/ejs as template files directory
app.set('views', path.join(rootDir, 'views', 'ejs'))

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(rootDir, 'public')))

app.use('/admin', adminData.router)
app.use(shopRoutes)

app.use((req, res) => {
    res.status(404).render('404', { pageTitle: 'Not Found' })
})

app.listen(3000)