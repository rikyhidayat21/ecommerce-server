const router = require('express').Router()
const product = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


router.use(authentication)
router.post('/products', authorization, product.create)

module.exports = router