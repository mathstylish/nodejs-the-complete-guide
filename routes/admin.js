const express = require('express')

const router = express.Router()

// /admin/add-product => GET
router.get('/add-product', (req, res) => {
    res.send('<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>')
})

// /admin/add-product => POST
router.post('/product', (req, res) => {
    console.log(req.body);
    res.redirect('/')
})

module.exports = router;