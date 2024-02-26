const Product = require("../models/product")

exports.getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            styles: ['shop', 'product'],
            path: '/products'
        })
    })
}

exports.getProduct = (req, res) => {
    const { productId } = req.params
    Product.findById(productId, product => {
        res.render('shop/product-detail', {
            prod: product,
            pageTitle: product.title,
            styles: ['shop', 'product'],
            path: '/products'
        })
    })
}

exports.getIndex = (req, res) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            styles: ['shop', 'product'],
            path: '/'
        })
    })
}

exports.getCart = (req, res) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        styles: [],
        path: '/cart'
    })
}

exports.getOrders = (req, res) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders',
        styles: [],
        path: '/orders'
    })
}

exports.getCheckout = (req, res) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        styles: [],
        path: '/checkout'
    })
}