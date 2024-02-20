const path = require('node:path')
const rootDir = require('../utils/path')
const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'))
})

module.exports = router;