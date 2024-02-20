const path = require('../utils/path')
const fs = require('node:fs')

module.exports = class Product {
    constructor(title) {
        this.title = title
    }

    save() {
        const storage = path.pathTo('data', 'products.json')
        // need to use arrow function here, because we need Product context
        fs.readFile(storage, (err, fileContent) => {
            let products = []
            if (!err) {
                products = JSON.parse(fileContent)
            }
            products.push(this)
            fs.writeFile(storage, JSON.stringify(products), err => {
                if (err) {
                    console.log(`error: ${err}`)
                }
            })
        })
    }

    static fetchAll(cb) {
        const storage = path.pathTo('data', 'products.json')
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
}