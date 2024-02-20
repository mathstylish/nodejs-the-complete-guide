const express = require('express')

const router = express.Router()

const adminData = require('./admin')

router.get('/', (req, res, next) => {
    const products = adminData.products
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        styles: ['shop', 'product'],
        path: '/shop'
    })
})

module.exports = router;