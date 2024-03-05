const getDb = require('../config/mongo.config.js').getDb

class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title
        this.price = price
        this.description = description
        this.imageUrl = imageUrl
    }

    save() {
        try {
            const db = getDb()
            db.collection('products').insertOne(this)
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = Product