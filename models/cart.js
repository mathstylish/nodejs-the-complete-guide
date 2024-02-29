const path = require('../utils/path')
const fs = require('node:fs')

const storage = path.pathTo('data', 'cart.json')

const getPrice = product => product.subTotal
const sumPrices = (prevPrice, currPrice) => prevPrice + currPrice

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // fetch the previous cart
        fs.readFile(storage, (err, fileContent) => {
            let cart = { products:[], totalPrice: 0 }
            if (!err) {
                cart = JSON.parse(fileContent)
            }
            // analyze the cart => find existing products
            const existingProductIndex = cart.products.findIndex(p => p.id === id)
            const existingProduct = cart.products[existingProductIndex]
            // add new product / increase quantity
            if (existingProduct) {
                const updatedProduct = { ...existingProduct }
                updatedProduct.qty += 1
                updatedProduct.subTotal += (+productPrice)
                cart.products[existingProductIndex] = updatedProduct
            } else {
                const newProduct = { id, qty: 1, subTotal: (+productPrice) }
                cart.products = [...cart.products, newProduct]
            }
            cart.totalPrice = cart.products.map(getPrice).reduce(sumPrices)
            fs.writeFile(storage, JSON.stringify(cart), err => {
                if (err) {
                    console.log(`err: ${err}`)
                }
            })
        })
    }

    static removeProduct(id, productPrice) {
        fs.readFile(storage, (err, fileContent) => {
            // didn't find a existing cart
            if (err) {
                return
            }
            const cart = JSON.parse(fileContent)
            // update the cart
            const product = cart.products.find(p => p.id === id)
            if (!product) {
                return;
            }
            cart.products = cart.products.filter(p => p.id !== id)
            cart.totalPrice = cart.totalPrice - productPrice * product.qty
            fs.writeFile(storage, JSON.stringify(cart), err => {
                if (err) {
                    console.log(`err: ${err}`)
                }
            })
        })
    }

    static getCart(cb) {
        fs.readFile(storage, (err, fileContent) => {
            if (err) {
                cb([])
            } else {
                cb(JSON.parse(fileContent))
            }
        })
    }
}