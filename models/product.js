const path = require('../utils/path')
const fs = require('node:fs')

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
    constructor(title, imageUrl, description, price) {
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
    }

    save() {
        loadProductsFromFile(products => {
            products.push(this)
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
}