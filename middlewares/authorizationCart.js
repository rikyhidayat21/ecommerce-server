const { Cart } = require('../models')

function authorizationCart(req, res, next) {
  let { id } = req.params
  Cart.findByPk(id)
  // Cart.findOne({
  //   where: { id }
  // })
    .then(cart => {
      console.log(cart, '<=== authorization cart')
      console.log(req.userData.id, '<=== req.userData.id di authorization cart')
      console.log(cart.userId, '<=== cart.userId di authorize cart')
      if(!cart) throw {msg: 'cart not found', statusCode: 404}
      else if(cart.userId === req.userData.id) next()
      else throw {msg: `you're not authorized`}
    })
    .catch(err => {
      // res.status(500).json({ error : err.msg || 'internal server error'})
      next(err)
    })

}


module.exports = authorizationCart