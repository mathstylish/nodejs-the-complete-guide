const path = require('node:path')
const rootDir = require('../utils/path')
const express = require('express')

const router = express.Router()

const adminData = require('./admin')

router.get('/', (req, res, next) => {
    res.render('shop')
})

module.exports = router;