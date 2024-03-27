import { Schema, model } from "mongoose"

// _id as a type of ObjectId is added automatically by mongoose
const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
})

// will be created as 'products' collection
const Product = model("Product", productSchema)

export default Product

// const logger = require("../helpers/logger")
// const { getDb, parseIdFromHexString } = require("../config/mongo.config.js")

// class Product {
//     constructor(title, imageUrl, price, description, id, userId) {
//         this.title = title
//         this.imageUrl = imageUrl
//         this.price = price
//         this.description = description
//         this._id = parseIdFromHexString(id)
//         this.userId = userId
//     }

//     async save() {
//         try {
//             const db = getDb()
//             let product
//             if (!this._id) {
//                 product = await db.collection("products").insertOne(this)
//                 return product
//             }
//             product = await db
//                 .collection("products")
//                 .updateOne({ _id: this._id }, { $set: this })
//             return product
//         } catch (err) {
//             if (!this._id) {
//                 logger.error(err, "Error on product save")
//                 return
//             }
//             logger.error(err, "Error on product update")
//         }
//     }

//     static async fetchAll() {
//         try {
//             const db = getDb()
//             const products = await db.collection("products").find().toArray()
//             return products
//         } catch (err) {
//             logger.error(err, "Error on product fetching")
//         }
//     }

//     static async findById(id) {
//         try {
//             const db = getDb()
//             const product = await db
//                 .collection("products")
//                 .findOne({ _id: parseIdFromHexString(id) })
//             return product
//         } catch (err) {
//             logger.error(err, "Error on fetching a single product")
//         }
//     }

//     static async deleteById(id) {
//         try {
//             const db = getDb()
//             await db
//                 .collection("products")
//                 .deleteOne({ _id: parseIdFromHexString(id) })

//             // remove deleted items from the cart
//             // there is no need to await
//             db.collection("users").updateMany(
//                 {},
//                 { $pull: { "cart.items": { _id: parseIdFromHexString(id) } } },
//             )
//         } catch (err) {
//             logger.error(err, "Error on delete product")
//         }
//     }
// }

// module.exports = Product
