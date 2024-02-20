const express = require('express')

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use('/add-product', (req, res) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>')
})

// this will only be triggered in post requests
app.post('/product', (req, res) => {
    console.log(req.body);
    res.redirect('/')
})

app.use('/', (req, res, next) => {
    res.send('<h1>Hello from Express!</h1>')
})

app.listen(3000)