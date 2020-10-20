const router = require('express').Router()
const user = require('./userRouter')
const product = require('./productRouter')
const cart = require('./cartRouter')

router.use('/', user)
router.use('/', product)
router.use('/', cart)

module.exports = router