const express = require('express')
const path = require('node:path')

const rootdir = require('../helpers/path')

const router = express.Router()

router.get('/users', (req, res) => {
    res.sendFile(path.join(rootdir, 'views', 'users.html'))
})

module.exports = router;