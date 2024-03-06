const logger = require('../helpers/logger')
const { getDb, parseIdFromHexString } = require('../config/mongo.config.js')

class Product {
    constructor(title, imageUrl, price, description, id) {
        this.title = title
        this.imageUrl = imageUrl
        this.price = price
        this.description = description
        this._id = id
    }

    async save() {
        try {
            const db = getDb()
            let product;
            if (!this._id) {
                product = await db.collection('products').insertOne(this)
                logger.debug(product, 'product saved')
                return product
            }
            product = await db.collection('products')
                .updateOne(
                    { _id: parseIdFromHexString(this._id) },
                    { $set: this }
                )
            logger.debug(product, 'product updated')
            return product
        } catch (err) {
            if (!this._id) {
                logger.error(err, 'error on product save')
                return
            }
            logger.error(err, 'error on product update')
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

    static async findById(id) {
        try {
            const db = getDb()
            const product = await db.collection('products')
                .findOne({ _id: parseIdFromHexString(id) })
            logger.debug(product, 'single product fetched')
            return product
        } catch (err) {
            logger.error(err, 'error on fetching a single product')
        }
    }

    static async deleteById(id) {
        try {
            const db = getDb()
            const product = await db.collection('products')
                .deleteOne({ _id: parseIdFromHexString(id) })
            logger.debug(product, 'product removed')
        } catch (err) {
            logger.error(err, 'error on delete product')
        }
    }
}

module.exports = Product