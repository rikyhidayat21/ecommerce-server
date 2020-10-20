const { Cart } = require('../models')
async function authorization(req, res, next) {
  try {
    // console.log(req.userData, '<<< req userData role di middleware authorization')
    // let { id } = req.params
    // const cart = await Cart.findByPk(id)
    
    // if (!cart) {
    //   throw { msg: 'cart not found'}
    // } else if ( cart.userId === req.userData.id ) {
    //   next ()
    // } else {
    //   if (req.userData.role !== 'admin') {
    //     throw { name: "AuthorizationFailed"}
    //   } else {
    //     throw { msg: 'you are not authorization'}
    //   }
    // }

    if (req.userData.role !== 'admin') throw { name: "AuthorizationFailed"}
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authorization