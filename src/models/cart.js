const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/sequelize.config.js')

class Cart extends Model {}

Cart.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
}, {
    sequelize,
    modelName: 'cart'
})

module.exports = Cart

