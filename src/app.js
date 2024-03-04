const express = require('express')

const $env = require('./config/env')
const path = require('./utils/path')

const sequelize = require('./config/sequelize.config.js')

const adminRoutes = require('./routes/admin.route.js')
const shopRoutes = require('./routes/shop.route.js')
const errorController = require('./controllers/error.controller.js')

const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.pathTo('views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.pathTo('public')))

// register mocked user in requests
app.use(async (req, res, next) => {
    try {
        const user = await User.findByPk(1)
        req.user = user
        next()
    } catch (err) {
        console.log(err)
    }
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem })

sequelize
    .sync({ force: true }) // do not use force: true in production
    // .sync()
    // create a dummy user
    .then(result => {
        return User.findByPk(1)
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'stylish', email: 'mathstylish@mail.com' })
        }
        return user
    })
    .then(user => {
        return user.createCart()
    })
    .then(cart => {
        app.listen($env.APP_PORT)
    })
    .catch(err => console.log(err))
