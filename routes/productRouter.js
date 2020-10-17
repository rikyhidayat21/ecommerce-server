const router = require('express').Router()
const product = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


router.use(authentication)

router.post('/products', authorization, product.create)
router.get('/products', product.findAll)
router.get('/products/:id', product.findById)
router.put('/products/:id', authorization, product.update)
router.delete('/products/:id', authorization, product.deleteProduct)

module.exports = router