const router = require('express').Router()
const user = require('./userRouter')

router.use('/', user)


module.exports = router