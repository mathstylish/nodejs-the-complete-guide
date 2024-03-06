const logger = require('../helpers/logger')
const Product = require('../models/product')

exports.getProducts = async (req, res) => {
   try {
     const products = await Product.fetchAll()
     logger.debug(products, 'admin products fetched')
     res.render('admin/products', {
        products: products,
        pageTitle: 'Admin Products',
        styles: ['shop', 'product'],
        path: '/admin/products'
     })
   } catch (err) {
        logger.error(err, 'getProducts error')
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
        const product = new Product(title, imageUrl, price, description)
        await product.save()
        res.redirect('/admin/products')
    } catch (err) {
        logger.error(err, 'postAddProduct error')
    }
}

exports.getEditProduct = async (req, res) => {
    try {
        const { editing } = req.query
        const { productId } = req.params
        const product = await Product.findById(productId)
        if (!product) {
            logger.debug(productId, 'product not found with this id')
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

exports.postEditProduct = async (req, res) => {
    try {
        const { productId, title, imageUrl, price, description } = req.body
        const updatedProduct = new Product(
            title,
            imageUrl,
            price,
            description,
            productId
        )
        await updatedProduct.save()
        res.redirect('/admin/products')
    } catch (err) {
        console.log(err)
    }
}

// exports.postDeleteProduct = async (req, res) => {
//     try {
//         const { productId } = req.body
//         const product = await Product.findByPk(productId)
//         product.destroy()
//         res.redirect('/admin/products')
//     } catch (err) {
//         console.log(err)
//     }
// }