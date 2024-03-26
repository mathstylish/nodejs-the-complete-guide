import logger from "../helpers/logger.js"
import Product from "../models/product.js"

const shopController = {
    getProducts: async (req, res) => {
        try {
            const products = await Product.find()
            res.render("shop/product-list", {
                products: products,
                pageTitle: "All Products",
                styles: ["shop", "product"],
                path: "/products",
            })
        } catch (err) {
            logger.error(err)
        }
    },

    getProduct: async (req, res) => {
        try {
            const { productId } = req.params
            const product = await Product.findById(productId)
            res.render("shop/product-detail", {
                product: product,
                pageTitle: product.title,
                styles: ["shop", "product"],
                path: "/products",
            })
        } catch (err) {
            logger.error(err)
        }
    },

    getIndex: async (req, res) => {
        try {
            const products = await Product.find()
            res.render("shop/index", {
                products: products,
                pageTitle: "Shop",
                styles: ["shop", "product"],
                path: "/",
            })
        } catch (err) {
            logger.error("Error fetching products", {
                err,
                formatStackTrace: true,
            })
        }
    },

    getCart: async (req, res) => {
        try {
            const cartProducts = await req.user.getCart()
            res.render("shop/cart", {
                pageTitle: "Your Cart",
                styles: ["cart"],
                path: "/cart",
                cart: {
                    items: cartProducts.product,
                    total: cartProducts.total,
                },
            })
        } catch (err) {
            logger.error(err)
        }
    },

    postCart: async (req, res) => {
        try {
            const { productId } = req.body
            const product = await Product.findById(productId)
            await req.user.addToCart(product)
            res.redirect("/cart")
        } catch (err) {
            logger.error(err)
        }
    },

    postCartDelete: async (req, res) => {
        try {
            const { productId } = req.body
            await req.user.deleteItemFromCart(productId)
            res.redirect("/cart")
        } catch (err) {
            console.log(err)
        }
    },

    postOrder: async (req, res) => {
        try {
            await req.user.addOrder()
            res.redirect("/orders")
        } catch (err) {
            console.log(err)
        }
    },

    getOrders: async (req, res) => {
        try {
            const orders = await req.user.getOrders()
            res.render("shop/orders", {
                pageTitle: "Your Orders",
                styles: ["shop", "order"],
                path: "/orders",
                orders: orders,
            })
        } catch (err) {
            console.log(err)
        }
    },
}

export default shopController
