const logger = require('../helpers/logger')
const Product = require('../models/product')

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.fetchAll()
        res.render('shop/product-list', {
            products: products,
            pageTitle: 'All Products',
            styles: ['shop', 'product'],
            path: '/products'
        })
    } catch (err) {
        logger.error(err)
    }
}

exports.getProduct = async (req, res) => {
    try {
        const { productId } = req.params
        const product = await Product.findById(productId)
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            styles: ['shop', 'product'],
            path: '/products'
        })
    } catch (err) {
        logger.error(err)
    }
}

exports.getIndex = async (req, res) => {
    try {
        const products = await Product.fetchAll()
        res.render('shop/index', {
            products: products,
            pageTitle: 'Shop',
            styles: ['shop', 'product'],
            path: '/'
        })
    } catch (err) {
        logger.error('Error fetching products', { err, formatStackTrace: true })
    }
}


exports.getCart = async (req, res) => {
    try {
        const cartProducts = await req.user.getCart()
        res.render('shop/cart', {
            pageTitle: 'Your Cart',
            styles: ['cart'],
            path: '/cart',
            cart: {
                items: cartProducts.product,
                total: cartProducts.total
            }
        })
    } catch (err) {
        logger.error(err)
    }
}

exports.postCart = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await Product.findById(productId)
        await req.user.addToCart(product)
        res.redirect('/cart')
    } catch (err) {
        logger.error(err)
    }
}

exports.postCartDelete = async (req, res) => {
    try {
        const { productId } = req.body
        await req.user.deleteItemFromCart(productId)
        res.redirect('/cart')
    } catch (err) {
        console.log(err)
    }    
}

exports.postOrder = async (req, res) => {
    try {
        await req.user.addOrder()
        res.redirect('/orders')
    } catch (err) {
        console.log(err)
    }
}

// exports.getOrders = async (req, res) => {
//     try {
//         const orders = await req.user.getOrders({ include: ['products'] })
//         res.render('shop/orders', {
//             pageTitle: 'Your Orders',
//             styles: ['shop', 'order'],
//             path: '/orders',
//             orders: orders
//         })
//     } catch (err) {
//         console.log(err)
//     }
// }
