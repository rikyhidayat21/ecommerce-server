const router = require('express').Router()
const product = require('../controllers/productController')


router.post('/products', product.create)

module.exports = router