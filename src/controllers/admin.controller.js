const logger = require('../helpers/logger')
const Product = require('../models/product')

exports.getProducts = async (req, res) => {
    try {
        logger.info(`Request received for fetching admin products. Path: ${req.path}, Method: ${req.method}`)
        const products = await Product.fetchAll()
        logger.info(`Admin products fetched successfully. Path: ${req.path}, Method: ${req.method}`)
        res.render('admin/products', {
            products: products,
            pageTitle: 'Admin Products',
            styles: ['shop', 'product'],
            path: '/admin/products'
        })
    } catch (err) {
        logger.error('Error fetching admin products', { err, formatStackTrace: true })
    }
}

exports.getAddProduct = (req, res) => {
    logger.info(`Request received for adding a product. Path: ${req.path}, Method: ${req.method}`)
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
        console.log('AAAA', req.user)
        const product = new Product(title, imageUrl, price, description, null, req.user._id)
        logger.info(`Saving product. Path: ${req.path}, Method: ${req.method}`, product, null)
        await product.save()
        res.redirect('/admin/products')
    } catch (err) {
        logger.error('Error adding product', { err, formatStackTrace: true })
    }
}

exports.getEditProduct = async (req, res) => {
    try {
        const { editing } = req.query
        const { productId } = req.params
        logger.info(`Request received for editing a product. Path: ${req.path}, Method: ${req.method}, Product ID: ${productId}`)
        const product = await Product.findById(productId)
        logger.info(`Product fetched successfully for editing. Path: ${req.path}, Method: ${req.method}, Product ID: ${productId}`)
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            styles: ['form'],
            path: '/admin/edit-product',
            editing: editing,
            product: product
        })
    } catch (err) {
        logger.error('Error fetching product for editing', { err, formatStackTrace: true })
    }
}

exports.postEditProduct = async (req, res) => {
    try {
        const { productId, title, imageUrl, price, description } = req.body
        const updatedProduct = new Product(title, imageUrl, price, description, productId)
        logger.info(`Updating product. Path: ${req.path}, Method: ${req.method}`, { data: updatedProduct })
        await updatedProduct.save()
        res.redirect('/admin/products')
    } catch (err) {
        logger.error('Error updating product', { err, formatStackTrace: true })
    }
}

exports.postDeleteProduct = async (req, res) => {
    try {
        const { productId } = req.body
        logger.info(`Request received for deleting a product. Path: ${req.path}, Method: ${req.method}, Product ID: ${productId}`)
        await Product.deleteById(productId)
        res.redirect('/admin/products')
    } catch (err) {
        logger.error('Error deleting product', { err, formatStackTrace: true })
    }
}
