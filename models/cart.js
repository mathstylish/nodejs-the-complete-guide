const path = require('../utils/path')
const fsPromises = require('node:fs/promises')

const storage = path.pathTo('data', 'cart.json')

const getPrice = product => product.subTotal
const sumPrices = (prevPrice, currPrice) => prevPrice + currPrice

const loadCartFromFile = async () => {
    try {
        const fileContent = await fsPromises.readFile(storage)
        return JSON.parse(fileContent)
    } catch (err) {
        return { products: [], totalPrice: 0 }
    }
}

module.exports = class Cart {
    static async addProduct(id, productPrice) {
        try {
            // fetch the previous cart
            // const cart = await loadCartFromFile()
            const cart = await loadCartFromFile()
            // analyze the cart => find existing products
            const existingProductIndex = cart.products.findIndex(p => p.id === id)
            const existingProduct = cart.products[existingProductIndex]
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
            await fsPromises.writeFile(storage, JSON.stringify(cart))
        } catch (err) {
            console.log(`err: ${err}`)
        }
    }

    static async removeProduct(id, productPrice) {
        try {
            const cart = await loadCartFromFile()
            // no products to remove
            if (cart.products.length === 0) {
                return
            }
            // update the cart
            const product = cart.products.find(p => p.id === id)
            if (!product) {
                return;
            }
            cart.products = cart.products.filter(p => p.id !== id)
            cart.totalPrice = cart.totalPrice - productPrice * product.qty
            await fsPromises.writeFile(storage, JSON.stringify(cart))
        } catch (err) {
            console.log(`err: ${err}`)
        }
    }

    static async getCart() {
        try {
            const fileContent = await fsPromises.readFile(storage)
            return JSON.parse(fileContent)
        } catch (err) {
            return []
        }
    }
}