const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/sequelize.config.js')

class CartItem extends Model { }

CartItem.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: DataTypes.INTEGER,
    subTotal: DataTypes.DOUBLE
}, {
    sequelize,
    modelName: 'cartItem'
})

module.exports = CartItem

