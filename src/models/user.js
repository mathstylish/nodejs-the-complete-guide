import { Schema, model } from "mongoose"

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                },
                quantity: { type: Number, required: true },
                subTotal: { type: Number, required: true },
            },
        ],
        total: {
            type: Number,
            required: true,
        },
    },
})

// will be created as 'products' collection
const User = model("User", userSchema)

export default User

// const { getDb, parseIdFromHexString } = require("../config/mongo.config")
// const logger = require("../helpers/logger")

// class User {
//     constructor(name, email, cart, id) {
//         this.name = name
//         this.email = email
//         this.cart = cart || { items: [], total: 0 }
//         this._id = id
//     }

//     async save() {
//         try {
//             const db = getDb()
//             await db.collection("users").insertOne(this)
//         } catch (err) {
//             logger.error(err, "Error when trying to save user", err)
//         }
//     }

//     // As a cart belongs to a user, in mongo, we can create an embedded document,
//     // that is, a user, which has a cart inside it.
//     async addToCart(product) {
//         try {
//             // Get index of product on the cart
//             const cartProductIdx = this.cart.items.findIndex(
//                 (cp) => cp.productId.toString() === product._id.toString(),
//             )
//             // Copy currCartItems to a new array to avoid working in same reference
//             const updatedCartItems = [...this.cart.items]
//             // We created functions to obtain the sum of all subtotals of the products in the cart
//             const getSubTotal = (product) => product.subTotal
//             const sumSubTotals = (prevSubTotal, currSubTotal) =>
//                 prevSubTotal + currSubTotal
//             // Case 1: product exists, so increase quantity and subTotal
//             if (cartProductIdx > -1) {
//                 updatedCartItems[cartProductIdx].quantity += 1
//                 updatedCartItems[cartProductIdx].subTotal += +product.price
//             } else {
//                 // Case 2: product not exists, so let's create a new one
//                 updatedCartItems.push({
//                     productId: product._id,
//                     quantity: 1,
//                     subTotal: +product.price,
//                 })
//             }
//             // calculate totals and create a updated cart with new items
//             const getCartTotalPrice = updatedCartItems
//                 .map(getSubTotal)
//                 .reduce(sumSubTotals)
//             const updatedCart = {
//                 items: updatedCartItems,
//                 total: getCartTotalPrice,
//             }
//             // then update in database
//             const db = getDb()
//             await db
//                 .collection("users")
//                 .updateOne({ _id: this._id }, { $set: { cart: updatedCart } })
//         } catch (err) {
//             logger.error("Error when trying to add to the cart", err)
//         }
//     }

//     async getCart() {
//         try {
//             const db = getDb()
//             const productIds = this.cart.items.map((item) => item.productId)
//             const products = await db
//                 .collection("products")
//                 .find({ _id: { $in: productIds } })
//                 .toArray()
//             const getItem = (product, item) =>
//                 item.productId.toString() === product._id.toString()
//             const productToView = (product) => {
//                 return {
//                     ...product,
//                     quantity: this.cart.items.find((item) =>
//                         getItem(product, item),
//                     ).quantity,
//                     subTotal: this.cart.items.find((item) =>
//                         getItem(product, item),
//                     ).subTotal,
//                 }
//             }
//             return {
//                 product: products.map(productToView),
//                 total: this.cart.total,
//             }
//         } catch (err) {
//             logger.error("Error when trying to get the cart", err)
//         }
//     }

//     async deleteItemFromCart(productId) {
//         try {
//             const updatedCartItems = this.cart.items.filter((item) => {
//                 return item.productId.toString() !== productId.toString()
//             })
//             // We created functions to obtain the sum of all subtotals of the products in the cart
//             const getSubTotal = (product) => product.subTotal
//             const sumSubTotals = (prevSubTotal, currSubTotal) =>
//                 prevSubTotal + currSubTotal
//             // re-calculate totals
//             let getCartTotalPrice =
//                 updatedCartItems.length > 0
//                     ? updatedCartItems.map(getSubTotal).reduce(sumSubTotals)
//                     : 0
//             const db = getDb()
//             await db.collection("users").updateOne(
//                 { _id: this._id },
//                 {
//                     $set: {
//                         cart: {
//                             items: updatedCartItems,
//                             total: getCartTotalPrice,
//                         },
//                     },
//                 },
//             )
//         } catch (err) {
//             logger.error("Error when trying to delete", err)
//         }
//     }

//     async addOrder() {
//         try {
//             const db = getDb()
//             const cart = await this.getCart()
//             // create a order
//             const order = {
//                 items: cart.product,
//                 total: cart.total,
//                 user: {
//                     _id: this._id,
//                     name: this.name,
//                 },
//             }
//             // add the cart to the order
//             await db.collection("orders").insertOne(order)
//             // clear the cart in user object
//             this.cart = { items: [], total: 0 }
//             // clear the cart in user database
//             await db
//                 .collection("users")
//                 .updateOne(
//                     { _id: this._id },
//                     { $set: { cart: { items: [], total: 0 } } },
//                 )
//         } catch (err) {
//             logger.error(err)
//         }
//     }

//     async getOrders() {
//         try {
//             const db = getDb()
//             const orders = await db
//                 .collection("orders")
//                 .find({ "user._id": this._id })
//                 .toArray()
//             return orders
//         } catch (err) {
//             logger.error(err)
//         }
//     }

//     static async findById(id) {
//         try {
//             const db = getDb()
//             const user = await db
//                 .collection("users")
//                 .findOne({ _id: parseIdFromHexString(id) })
//             return user
//         } catch (err) {
//             logger.error(err, "Error when trying to get user")
//         }
//     }
// }

// module.exports = User
