const path = require('../utils/path')
const fs = require('node:fs')
const crypto = require('crypto')
const Cart = require('./cart')

const storage = path.pathTo('data', 'products.json')

const loadProductsFromFile = cb => {
    // need to use arrow function here, because we need Product class context
    fs.readFile(storage, (err, fileContent) => {
        // need to use a callback, because readFile is async
        // so, fetchAll returns nothing before readFile is done
        // so, a solution is to pass this callback when readFile is done 
        // and pass empty array if err or return fileContent
        if (err) {
            cb([])
        } else {
            cb(JSON.parse(fileContent))
        }
    })
}

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id
        this.title = title
        this.imageUrl = imageUrl
        this.price = price
        this.description = description
    }

    save() {
        loadProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(p => p.id === this.id)
                products[existingProductIndex] = this
            } else {
                this.id = crypto.randomBytes(4).toString('hex')
                products.push(this)
            }
            fs.writeFile(storage, JSON.stringify(products), err => {
                if (err) {
                    console.log(`error: ${err}`)
                }
            })
        })
    }

    static fetchAll(cb) {
        loadProductsFromFile(cb)
    }

    static findById(id, cb) {
        loadProductsFromFile(products => {
            const product = products.find(p => p.id === id)
            cb(product)
        })
    }

    static deleteById(id) {
        loadProductsFromFile(products => {
            const product = products.find(p => p.id === id)
            const updatedProducts = products.filter(p => p.id !== id)
            fs.writeFile(storage, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    // remove from cart if it is there too
                    Cart.removeProduct(id, product.price)
                } else {
                    console.log(`error: ${err}`)
                }
            })
        })
    }
}