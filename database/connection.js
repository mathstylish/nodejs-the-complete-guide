const mysql = require('mysql2/promise')

const $env = require('../config/env')

// https://sidorares.github.io/node-mysql2/docs#using-connection-pools
const pool = mysql.createPool({
  host: $env.DB_HOST,
  user: $env.DB_USER,
  password: $env.DB_PASSWORD,
  database: $env.DB_NAME,
})

module.exports = pool