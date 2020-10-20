const router = require('express').Router()
const cartController = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')
const authorizationCart = require('../middlewares/authorizationCart')

router.use(authentication)
router.post('/carts', cartController.create)
router.get('/carts', cartController.getAll)
router.delete('/carts/:id', authorizationCart, cartController.delete)
router.put('/carts/:id', authorizationCart, cartController.update)

module.exports = router