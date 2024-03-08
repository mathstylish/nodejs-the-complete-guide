const logger = require('../helpers/logger')
const Product = require('../models/product')

exports.getProducts = async (req, res) => {
    try {
        logger.info(`Request received for fetching products. Path: ${req.path}, Method: ${req.method}`)
        const products = await Product.fetchAll()
        logger.info(`Products fetched successfully. Path: ${req.path}, Method: ${req.method}`)
        res.render('shop/product-list', {
            products: products,
            pageTitle: 'All Products',
            styles: ['shop', 'product'],
            path: '/products'
        })
    } catch (err) {
        logger.error('Error fetching products', { err, formatStackTrace: true })
    }
}

exports.getProduct = async (req, res) => {
    try {
        const { productId } = req.params
        logger.info(`Request received for fetching product. Path: ${req.path}, Method: ${req.method}, Product ID: ${productId}`)
        const product = await Product.findById(productId)
        logger.info(`Product fetched successfully. Path: ${req.path}, Method: ${req.method}, Product ID: ${productId}`)
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            styles: ['shop', 'product'],
            path: '/products'
        })
    } catch (err) {
        logger.error('Error fetching product', { err, formatStackTrace: true })
    }
}

exports.getIndex = async (req, res) => {
    try {
        logger.info(`Request received for fetching products. Path: ${req.path}, Method: ${req.method}`)
        const products = await Product.fetchAll()
        logger.info(`Products fetched successfully. Path: ${req.path}, Method: ${req.method}`)
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


// exports.getCart = async (req, res) => {
//     try {
//         const cart = await req.user.getCart()
//         const cartProducts = await cart.getProducts()
//         res.render('shop/cart', {
//             pageTitle: 'Your Cart',
//             styles: ['cart'],
//             path: '/cart',
//             cart: cartProducts
//         })
//     } catch (err) {
//         console.log(err)
//     }
// }

// exports.postCart = async (req, res) => {
//     try {
//         const { productId } = req.body
//         // get the cart / get the product in the cart
//         const cart = await req.user.getCart()
//         const cartProduct = await cart.getProducts({ where: { id: productId } })
//         // store cart in a new variable, if exists (length > 0)
//         let product;
//         if (cartProduct.length > 0) {
//             product = cartProduct[0]
//         }
//         // product is in the cart
//         if (product) {
//             const newQuantity = product.cartItem.quantity + 1
//             const newSubTotal = product.cartItem.subTotal + product.price
//             await cart.addProduct(product, {
//                 through: {
//                     quantity: newQuantity,
//                     subTotal: newSubTotal
//                 }
//             })
//         } else {
//             // product is not in the cart
//             const newCartProduct = await Product.findByPk(productId)
//             if (newCartProduct) {
//                 await cart.addProduct(newCartProduct, {
//                     through: {
//                         quantity: 1,
//                         subTotal: newCartProduct.price 
//                     } 
//                 })
//             }
//         }
//         res.redirect('/cart')
//     } catch (err) {
//         console.log(err)
//     }
// }

// exports.postCartDelete = async (req, res) => {
//     try {
//         const { productId } = req.body
//         const cart = await req.user.getCart()
//         const cartProduct = await cart.getProducts({ where: { id: productId } })
//         const product = cartProduct[0]
//         await product.cartItem.destroy()
//         res.redirect('/cart')
//     } catch (err) {
//         console.log(err)
//     }    
// }

// exports.postOrder = async (req, res) => {
//     try {
//         const cart = await req.user.getCart()
//         const cartProducts = await cart.getProducts()
//         const order = await req.user.createOrder()
//         await order.addProducts(cartProducts.map(product => {
//             product.orderItem = {
//                 quantity: product.cartItem.quantity,
//                 subTotal: product.cartItem.subTotal
//             }
//             return product
//         }))
//         cart.setProducts(null)
//         res.redirect('/orders')
//     } catch (err) {
//         console.log(err)
//     }
// }

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
