const express = require('express')

const router = express.Router()

router.get('/add-product', (req, res) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>')
})

// this will only be triggered in post requests
router.post('/product', (req, res) => {
    console.log(req.body);
    res.redirect('/')
})

module.exports = router;