const express = require('express')

const app = express()

app.use('/', (req, res, next) => {
    console.log('This always runs!')
    next()
})

app.use('/add-product', (req, res, next) => {
    console.log('In middleware');
    res.send('<h1>the "Add Product" Page</h1>')
    next() // this will call next callback function in this app.use
}, () => console.log("I'm done"))

app.use('/', (req, res, next) => {
    console.log('In another middleware')
    res.send('<h1>Hello from Express!</h1>')
})

app.listen(3000)