import logger from "../helpers/logger.js"
import Product from "../models/product.js"

const adminController = {
    getProducts: async (req, res) => {
        try {
            const products = await Product.find()
            res.render("admin/products", {
                products: products,
                pageTitle: "Admin Products",
                styles: ["shop", "product"],
                path: "/admin/products",
            })
        } catch (err) {
            logger.error(err)
        }
    },

    getAddProduct: (req, res) => {
        res.render("admin/edit-product", {
            pageTitle: "Add Product",
            styles: ["form"],
            path: "/admin/add-product",
            editing: false,
        })
    },

    postAddProduct: async (req, res) => {
        try {
            const { title, price, description, imageUrl } = req.body
            // You can pass req.user or req.user.id. Mongoose will extract id from req.user, not the entire user
            const userId = req.user
            const product = new Product({
                title,
                price,
                description,
                imageUrl,
                userId,
            })
            await product.save()
            res.redirect("/admin/products")
        } catch (err) {
            logger.error(err)
        }
    },

    getEditProduct: async (req, res) => {
        try {
            const { editing } = req.query
            const { productId } = req.params
            const product = await Product.findById(productId)
            res.render("admin/edit-product", {
                pageTitle: "Edit Product",
                styles: ["form"],
                path: "/admin/edit-product",
                editing: editing,
                product: product,
            })
        } catch (err) {
            logger.error(err)
        }
    },

    postEditProduct: async (req, res) => {
        try {
            const { productId, title, price, description, imageUrl } = req.body
            const existingProduct = await Product.findById(productId)
            existingProduct.title = title
            existingProduct.price = price
            existingProduct.description = description
            existingProduct.imageUrl = imageUrl
            await existingProduct.save()
            res.redirect("/admin/products")
        } catch (err) {
            logger.error(err)
        }
    },

    postDeleteProduct: async (req, res) => {
        try {
            const { productId } = req.body
            await Product.findByIdAndDelete(productId)
            res.redirect("/admin/products")
        } catch (err) {
            logger.error(err)
        }
    },
}

export default adminController
