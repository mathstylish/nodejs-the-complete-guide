const Product = require("../models/product")

module.exports = {
    getAddProduct: (req, res) => {
        res.render('add-product', {
            pageTitle: 'Add Product',
            styles: ['form'],
            path: '/admin/add-product'
        })
    },
    postAddProduct: (req, res) => {
        const product = new Product(req.body.title)
        product.save()
        res.redirect('/')
    },
    getProducts: (req, res) => {
        const products = Product.fetchAll()
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            styles: ['shop', 'product'],
            path: '/shop'
        })
    }
};