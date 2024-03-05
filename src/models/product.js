const logger = require('../helpers/logger')
const getDb = require('../config/mongo.config.js').getDb

class Product {
    constructor(title, imageUrl, price, description) {
        this.title = title
        this.imageUrl = imageUrl
        this.price = price
        this.description = description
    }

    async save() {
        try {
            const db = getDb()
            const product = await db.collection('products').insertOne(this)
            logger.debug(product, 'product saved')
            return product
        } catch (err) {
            logger.error(err, 'error on product save')
        }
    }

    static async fetchAll() {
        try {
            const db = getDb()
            const products = await db.collection('products')
                .find()
                .toArray()
            return products
        } catch (err) {
            logger.error(err, 'error on product fetching')
        }
    }
}

module.exports = Product