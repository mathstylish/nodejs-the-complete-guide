const { getDb, parseIdFromHexString } = require('../config/mongo.config')
const logger = require('../helpers/logger')

class User {
    constructor(username, email, cart, id) {
        this.username = username
        this.email = email
        this.cart = cart
        this._id = id
    }

    async save() {
        try {
            logger.info('Saving user. Received user object:', { data: this })
            const db = getDb()
            const user = await db.collection('users').insertOne(this)
            logger.info('User saved successfully. Saved user object:', { data: user })
        } catch (err) {
            logger.error('save(): Error when trying to save user', { err, formatStackTrace: true })
        }
    }

    async addToCart(product) {
        try {
            // const cartProduct = cart.items.findIndex(cp => {
            //     logger.info(`cp._id: ${cp._id} [${typeof cp._id}] and product._id: ${product._id} [${typeof product._id}]`)
            //     return cp._id === product._id
            // })
            logger.info(`product received in addToCart with id: ${this._id} [${typeof this._id}]`, { data: this })
            const updatedCart = { items: [ { productId: product._id, quantity: 1 } ] }
            updatedCart.subTotal = product.price
            updatedCart.total = product.price
            const db = getDb()
            const cartUpdate = db.collection('users').updateOne(
                { _id: this._id},
                { $set: { cart: updatedCart } }
            )
            logger.info('Cart updated successfully. cart object:', { data: cartUpdate })
        } catch (err) {
            logger.error('addToCart(): error when trying to get the cart', { err, formatStackTrace: true })
        }
    }

    static async findById(id) {
        try {
            logger.info(`findById(): Searching for user with id: ${id} [${typeof id}]`)
            const db = getDb()
            const user = await db.collection('users').findOne({ _id: parseIdFromHexString(id) })
            logger.info(`findById(): User ${user._id} [${typeof user._id}] retrieved from database. User object:`, { data: user })
            return user
        } catch (error) {
            logger.error('findById(): Error when trying to get user', { error, formatStackTrace: true })
        }
    }
}

module.exports = User
