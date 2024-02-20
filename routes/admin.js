const path = require('node:path')
const express = require('express')

const router = express.Router()

// /admin/add-product => GET
router.get('/add-product', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))
})

// /admin/add-product => POST
router.post('/product', (req, res) => {
    console.log(req.body);
    res.redirect('/')
})

module.exports = router;