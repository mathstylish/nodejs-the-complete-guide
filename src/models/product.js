const mongoConnect = require('../config/mongo.config.js')

class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title
        this.price = price
        this.description = description
        this.imageUrl = imageUrl
    }

    save() {

    }
}

module.exports = Product