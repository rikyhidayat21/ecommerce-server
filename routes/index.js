const router = require('express').Router()
const user = require('./userRouter')
const product = require('./productRouter')

router.use('/', user)
router.use('/', product)

module.exports = router