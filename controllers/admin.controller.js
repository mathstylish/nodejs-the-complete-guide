const Product = require("../models/product")

exports.getAddProduct = (req, res) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        styles: ['form'],
        path: '/admin/add-product',
        editing: false
    })
}

exports.postAddProduct = (req, res) => {
    const { title, imageUrl, price, description } = req.body
    const product = new Product(title, imageUrl, price, description)
    product.save()
    res.redirect('/')
}

exports.getEditProduct = (req, res) => {
    const { editing } = req.query
    if (!editing) {
        return res.redirect('/')
    }
    const { productId } = req.params
    Product.findById(productId, product => {
        if (!product) {
            return res.redirect('/')
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            styles: ['form'],
            path: '/admin/edit-product',
            editing: editing,
            product: product
        })
    })
}

exports.getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            products: products,
            pageTitle: 'Admin Products',
            styles: ['shop', 'product'],
            path: '/admin/products'
        })
    })
}
