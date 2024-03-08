const logger = require('../helpers/logger')
const { getDb, parseIdFromHexString } = require('../config/mongo.config.js')

class Product {
    constructor(title, imageUrl, price, description, id, userId) {
        this.title = title
        this.imageUrl = imageUrl
        this.price = price
        this.description = description
        this._id = id
        this.userId = userId
    }

    async save() {
        try {
            const db = getDb()
            let product
            if (!this._id) {
                logger.info('Saving new product. Product object:', { data: this })
                product = await db.collection('products').insertOne(this)
                logger.info('Product saved successfully. Saved product object:', { data: product })
                return product
            }
            logger.info(`Updating product with ID: ${this._id} [${typeof id}]. Updated product object:`, { data: this })
            product = await db.collection('products')
                .updateOne(
                    { _id: parseIdFromHexString(this._id) },
                    { $set: this }
                )
            logger.info(`Product updated successfully. Updated product object:`, { data: product })
            return product
        } catch (err) {
            if (!this._id) {
                logger.error('Error on product save', { err })
                return
            }
            logger.error('Error on product update', { err })
        }
    }

    static async fetchAll() {
        try {
            const db = getDb()
            logger.info('Fetching all products...')
            const products = await db.collection('products')
                .find()
                .toArray()
            logger.info('Products fetched successfully. Fetched products:', { data: products })
            return products
        } catch (err) {
            logger.error('Error on product fetching', { err })
        }
    }

    static async findById(id) {
        try {
            const db = getDb()
            logger.info(`Searching for product with ID: ${id} [${typeof id}]...`)
            const product = await db.collection('products').findOne({ _id: parseIdFromHexString(id) })
            logger.info(`Product found successfully. Found product object:`, { data: product })
            return product
        } catch (err) {
            logger.error('Error on fetching a single product', { err })
        }
    }

    static async deleteById(id) {
        try {
            const db = getDb()
            logger.info(`Deleting product with ID: ${id} [${typeof id}]...`)
            const product = await db.collection('products')
                .deleteOne({ _id: parseIdFromHexString(id) })
            logger.info('Product deleted successfully.',  { data: product })
        } catch (err) {
            logger.error('Error on delete product', { err })
        }
    }
}

module.exports = Product
