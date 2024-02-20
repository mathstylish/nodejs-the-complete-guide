const path = require('node:path')
const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
    res.sendFile(path.join(path.join(__dirname, '..', 'views', 'shop.html')))
})

module.exports = router;