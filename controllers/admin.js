const Product = require("../models/product")

exports.getAddProduct = (req, res) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        styles: ['form'],
        path: '/admin/add-product'
    })
}

exports.postAddProduct = (req, res) => {
    const { title, imageUrl, price, description } = req.body
    console.log(req.body)
    const product = new Product(title, imageUrl, price, description)
    console.log(product)
    product.save()
    res.redirect('/')
}

exports.getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            styles: ['shop', 'product'],
            path: '/admin/products'
        })
    })
}
