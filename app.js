const express = require('express')
// const bodyParser = require('body-parser')

const app = express()

// true: use qs to parse URL-encoded data (recommended)
// false: use querystring to parse URL-encoded data (deprecated)

// in new versions of express, we can use express.urlencoded
app.use(express.urlencoded({ extended: true }))

// app.use(bodyParser.urlencoded({ extended: true }))

app.use('/add-product', (req, res) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>')
})

app.use('/product', (req, res) => {
    console.log(req.body);
    res.redirect('/')
})

app.use('/', (req, res, next) => {
    res.send('<h1>Hello from Express!</h1>')
})

app.listen(3000)