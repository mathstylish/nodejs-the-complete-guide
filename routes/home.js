const express = require('express')
const path = require('node:path')

const rootdir = require('../helpers/path')

const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(path.join(rootdir, 'views', 'home.html'))
})

module.exports = router;