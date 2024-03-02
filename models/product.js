const path = require('../utils/path')
const fsPromises = require('node:fs/promises')
const crypto = require('crypto')
const Cart = require('./cart')

const storage = path.pathTo('data', 'products.json')

// need to use arrow function here, because we need Product class context
const loadProductsFromFile = async () => {
    try {
        const fileContent = await fsPromises.readFile(storage)
        return JSON.parse(fileContent)
    } catch (err) {
        return []
    }
}

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id
        this.title = title
        this.imageUrl = imageUrl
        this.price = price
        this.description = description
    }

    async save() {
        try {
            const products = await loadProductsFromFile()
            if (this.id) {
                const existingProductIndex = products.findIndex(p => p.id === this.id)
                products[existingProductIndex] = this
            } else {
                this.id = crypto.randomBytes(4).toString('hex')
                products.push(this)
            }
            await fsPromises.writeFile(storage, JSON.stringify(products))
        } catch (err) {
            console.log(`error: ${err}`)
        }
    }

    static async fetchAll() {
        return await loadProductsFromFile()
    }

    static async findById(id) {
        const products = await loadProductsFromFile()
        const product = products.find(p => p.id === id)
        return product
    }

    static async deleteById(id) {
        try {
            const products = await loadProductsFromFile()
            const product = products.find(p => p.id === id)
            const updatedProducts = products.filter(p => p.id !== id)
            // remove from cart if it is there too
            Cart.removeProduct(id, product.price)
            await fsPromises.writeFile(storage, JSON.stringify(updatedProducts))
        } catch (err) {
            console.log(`error: ${err}`)
        }
    }
    
}