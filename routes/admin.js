const path = require('node:path')
const rootDir = require('../utils/path')
const express = require('express')

const router = express.Router()

const products = []

// /admin/add-product => GET
router.get('/add-product', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
})

// /admin/add-product => POST
router.post('/add-product', (req, res) => {
    products.push({ title: req.body.title })
    res.redirect('/')
})

module.exports = {
    router,
    products
}