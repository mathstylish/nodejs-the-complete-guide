const $env = require('./env')
const Sequelize = require('sequelize')

const sequelize = new Sequelize($env.DB_NAME, $env.DB_USER, $env.DB_PASSWORD, {
  dialect: 'mysql',
  host: $env.DB_HOST
})

module.exports = sequelize