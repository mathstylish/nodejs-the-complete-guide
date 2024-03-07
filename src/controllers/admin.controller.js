const logger = require('../helpers/logger')
const Product = require('../models/product')

exports.getProducts = async (req, res) => {
    try {
        logger.info(`request received: ${req.path}`, null, req)
        const products = await Product.fetchAll()
        logger.info(`products from database: ${req.path}`, products, null)
        res.render('admin/products', {
            products: products,
            pageTitle: 'Admin Products',
            styles: ['shop', 'product'],
            path: '/admin/products'
        })
    } catch (err) {
        logger.error('error when trying to fetch products', err, { prettyStack: true })
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
        logger.info(`request received: ${req.path}`, null, req)
        const { title, imageUrl, price, description } = req.body
        const product = new Product(title, imageUrl, price, description)
        logger.info(`saving product: ${req.path}`, product, null)
        await product.save()
        res.redirect('/admin/products')
    } catch (err) {
        logger.error('error when trying to add product', err, { prettyStack: true })
    }
}

exports.getEditProduct = async (req, res) => {
    try {
        logger.info(`request received: ${req.path}`, null, req)
        const { editing } = req.query
        const { productId } = req.params
        const product = await Product.findById(productId)
        logger.info(`product from database: ${req.path}`, product, null)
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            styles: ['form'],
            path: '/admin/edit-product',
            editing: editing,
            product: product
        })
    } catch (err) {
        logger.error('error when trying to get a product to edit', err, { prettyStack: true })
    }
}

exports.postEditProduct = async (req, res) => {
    try {
        logger.info(`request received: ${req.path}`, null, req)
        const { productId, title, imageUrl, price, description } = req.body
        const updatedProduct = new Product(
            title,
            imageUrl,
            price,
            description,
            productId
        )
        logger.info(`updating product: ${req.path}`, updatedProduct, null)
        await updatedProduct.save()
        res.redirect('/admin/products')
    } catch (err) {
        logger.error('error when trying to update a product', err, { prettyStack: true })
    }
}

exports.postDeleteProduct = async (req, res) => {
    try {
        logger.info(`request received: ${req.path}`, null, req)
        const { productId } = req.body
        await Product.deleteById(productId)
        res.redirect('/admin/products')
    } catch (err) {
        console.log(err)
    }
}