const express = require('express')

const router = express.Router()

const products = []

// /admin/add-product => GET
router.get('/add-product', (req, res) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        styles: ['form'],
        path: '/admin/add-product'
    })
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