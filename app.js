const express = require('express')

const path = require('node:path')
const rootDir = require('./utils/path')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(rootDir, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(rootDir, 'public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use((req, res) => {
    res.status(404).render('404', { pageTitle: 'Not Found', styles: ['404'] })
})

app.listen(3000)