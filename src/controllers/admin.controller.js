const Product = require("../models/product")

exports.getProducts = async (req, res) => {
   try {
     const products = await Product.findAll()
     res.render('admin/products', {
        products: products,
        pageTitle: 'Admin Products',
        styles: ['shop', 'product'],
        path: '/admin/products'
     })
   } catch (err) {
        console.log(err)
   }
}

exports.getAddProduct = (req, res) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        styles: ['form'],
        path: '/admin/add-product',
        editing: false
    })
}

exports.postAddProduct = async (req, res) => {
    try {
        const { title, imageUrl, price, description } = req.body
        await Product.create({
            title,
            imageUrl,
            price,
            description
        })
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
}

exports.getEditProduct = async (req, res) => {
    try {
    const { editing } = req.query
    const { productId } = req.params
        const product = await Product.findByPk(productId)
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
    } catch (err) {
        console.log(err)
    }
}

exports.postEditProduct = (req, res) => {
    const { productId, title, imageUrl, price, description } = req.body
    const updatedProduct = new Product(productId, title, imageUrl, price, description)
    updatedProduct.save()
    res.redirect('/admin/products')
}

exports.postDeleteProduct = (req, res) => {
    const { productId } = req.body
    Product.deleteById(productId)
    res.redirect('/admin/products')
}