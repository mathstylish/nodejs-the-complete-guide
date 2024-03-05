const logger = require('../helpers/logger')
const getDb = require('../config/mongo.config.js').getDb

class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title
        this.price = price
        this.description = description
        this.imageUrl = imageUrl
    }

    async save() {
        try {
            const db = getDb()
            const product = await db.collection('products').insertOne(this)
            logger.debug(product, 'product saved')
            return product
        } catch (err) {
            logger.error(err)
        }
    }


}

module.exports = Product