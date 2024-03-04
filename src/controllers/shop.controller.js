const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll()
        res.render('shop/product-list', {
            products: products,
            pageTitle: 'All Products',
            styles: ['shop', 'product'],
            path: '/products'
        })
    } catch (err) {
        console.log(err)
    }
}

exports.getProduct = async (req, res) => {
    try {
        const { productId } = req.params
        const product = await Product.findByPk(productId)
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            styles: ['shop', 'product'],
            path: '/products'
        })
    } catch (err) {
        console.log(err)
    }
}

exports.getIndex = async (req, res) => {
    try {
        const products = await Product.findAll()
        res.render('shop/index', {
            products: products,
            pageTitle: 'Shop',
            styles: ['shop', 'product'],
            path: '/'
        })
    } catch (err) {
        console.log(err)
    }
}

exports.getCart = async (req, res) => {
    try {
        const cart = await req.user.getCart()
        const cartProducts = await cart.getProducts()
        console.log(cartProducts)
        res.render('shop/cart', {
            pageTitle: 'Your Cart',
            styles: ['cart'],
            path: '/cart',
            cart: cartProducts
        })
    } catch (err) {
        console.log(err)
    }
}

exports.postCart = async (req, res) => {
    try {
        const { productId } = req.body
        // get the cart / get the product in the cart
        const cart = await req.user.getCart()
        const cartProduct = await cart.getProducts({ where: { id: productId } })
        // store cart in a new variable, if exists (length > 0)
        let product;
        if (cartProduct.length > 0) {
            product = cartProduct[0]
        }
        // product is in the cart
        if (product) {
            const newQuantity = product.cartItem.quantity + 1
            const newSubTotal = product.cartItem.subTotal + product.price
            cart.addProduct(product, {
                through: {
                    quantity: newQuantity,
                    subTotal: newSubTotal
                }
            })
        } else {
            // product is not in the cart
            const newCartProduct = await Product.findByPk(productId)
            if (newCartProduct) {
                cart.addProduct(newCartProduct, {
                    through: {
                        quantity: 1,
                        subTotal: newCartProduct.price 
                    } 
                })
            }
        }
        res.redirect('/cart')
    } catch (err) {
        console.log(err)
    }
}

exports.postCartDelete = async (req, res) => {
    const { productId } = req.body
    const product = await Product.findById(productId)
    Cart.removeProduct(productId, product.price)
    res.redirect('/cart')
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