const express = require('express')

const router = express.Router()

const adminController = require('../controllers/admin.controller.js')

router.get('/add-product', adminController.getAddProduct)
router.get('/products', adminController.getProducts)
router.post('/add-product', adminController.postAddProduct)
router.get('/edit-product/:productId', adminController.getEditProduct)
router.put('/edit-product', adminController.putEditProduct)

module.exports = router