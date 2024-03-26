import logger from "../helpers/logger.js"
import Product from "../models/product.js"

const adminController = {
    getProducts: async (req, res) => {
        try {
            const products = await Product.fetchAll()
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
            const { title, imageUrl, price, description } = req.body
            const product = new Product(
                title,
                imageUrl,
                price,
                description,
                null,
                req.user._id,
            )
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
            const { productId, title, imageUrl, price, description } = req.body
            const updatedProduct = new Product(
                title,
                imageUrl,
                price,
                description,
                productId,
            )
            await updatedProduct.save()
            res.redirect("/admin/products")
        } catch (err) {
            logger.error(err)
        }
    },

    postDeleteProduct: async (req, res) => {
        try {
            const { productId } = req.body
            await Product.deleteById(productId)
            res.redirect("/admin/products")
        } catch (err) {
            logger.error(err)
        }
    },
}

export default adminController
