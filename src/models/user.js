const { getDb, parseIdFromHexString } = require('../config/mongo.config')
const logger = require('../helpers/logger')

class User {
    constructor(name, email, cart, id) {
        this.name = name
        this.email = email
        this.cart = cart || { items: [] }
        this._id = id
    }

    async save() {
        try {
            const db = getDb()
            await db.collection('users').insertOne(this)
        } catch (err) {
            logger.error(err, 'Error when trying to save user', err)
        }
    }

    // As a cart belongs to a user, in mongo, we can create an embedded document,
    // that is, a user, which has a cart inside it.
    async addToCart(product) {
        try {
            // Get index of product on the cart
            const cartProductIdx = this.cart.items.findIndex(cp => cp.productId.toString() === product._id.toString())
            // Copy currCartItems to a new array to avoid working in same reference
            const updatedCartItems = [...this.cart.items]
            // We created functions to obtain the sum of all subtotals of the products in the cart
            const getSubTotal = (product) => product.subTotal
            const sumSubTotals = (prevSubTotal, currSubTotal) => prevSubTotal + currSubTotal
            // Case 1: product exists, so increase quantity and subTotal
            if (cartProductIdx > -1) {
                updatedCartItems[cartProductIdx].quantity += 1
                updatedCartItems[cartProductIdx].subTotal += (+product.price)
            } else { // Case 2: product not exists, so let's create a new one
                updatedCartItems.push({ productId: product._id, quantity: 1, subTotal: (+product.price) })
            }
            // calculate totals and create a updated cart with new items
            const getCartTotalPrice = updatedCartItems.map(getSubTotal).reduce(sumSubTotals)
            const updatedCart = { items: updatedCartItems, total: getCartTotalPrice }
            // then update in database
            const db = getDb()
            await db.collection('users').updateOne(
                { _id: this._id },
                { $set: { cart: updatedCart } }
            )
        } catch (err) {
            logger.error('Error when trying to get the cart', err)
        }
    }

    static async findById(id) {
        try {
            const db = getDb()
            const user = await db.collection('users').findOne({ _id: parseIdFromHexString(id) })
            return user
        } catch (error) {
            logger.error(err, 'Error when trying to get user')
        }
    }
}

module.exports = User
