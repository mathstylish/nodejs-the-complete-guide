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
    const cart = await Cart.getCart()
    const products = await Product.fetchAll()
    const cartProducts = []

    products.forEach(product => {
        const cartProduct = cart.products.find(p => p.id === product.id)
        if (cartProduct) {
            cartProducts.push({
                product: product,
                subTotal: cartProduct.subTotal,
                qty: cartProduct.qty
            })
        }
    })

    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        styles: ['cart'],
        path: '/cart',
        cart: cartProducts
    })

}

exports.postCart = async (req, res) => {
    const { productId } = req.body
    const product = await Product.findById(productId)
    Cart.addProduct(productId, product.price)
    res.redirect('/')
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