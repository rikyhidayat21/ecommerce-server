const { Cart, User, Product } = require('../models')

class CartController {
  static create(req, res, next) {
    // start versi awal 
    // const { productId, price, totalItem } = req.body
    // Cart.findOne({
    //   where: { 
    //     productId,
    //     userId: req.userData.id
    //   }
    // })
    //   .then(data => {
    //     console.log('masukk create cart di controller')
    //     console.log(req.userData.id, '<==== req.userData.id')
    //     console.log(data, '<=== cart ===>')
    //     if(data === null) {
    //       return Cart.create({
    //         productId,
    //         userId: req.userData.id,
    //         // quantity: totalItem,
    //         // price: totalItem * price
    //       })
    //     } else {
    //       return Cart.update({
    //         quantity: data.quantity += 1,
    //         // price: (+totalItem + data.quantity) * price
    //       }, {
    //         where: {
    //           productId
    //         }
    //       })
    //     }
    //   })
    //   .then(data => {
    //     console.log(data, '<== data create')
    //     res.status(201).json({
    //       msg: 'success add product to cart',
    //       data
    //     })
    //   })
    //   .catch(err => {
    //     console.log(err, '<=== error add to cart di controller')
    //     next(err)
    //   })
    // end versi awal
    const { productId } = req.body

    Cart.findOne({
      where: { productId, userId: req.userData.id},
      include: { model: Product }
    })
      .then(cart => {
        if (cart) {
          if(cart.Product.stock <=cart.quantity) {
            throw {msg: 'Maximum stock limit'}
          } else {
            cart.quantity += 1
            return cart.save()
          }
        } else {
          return Cart.create({
            productId,
            userId: req.userData.id
          })
        }
      })
      .then(cart => {
        res.status(201).json({
          msg: 'success add product to cart',
          cart
        })
      })
      .catch(err => {
        console.log(err, '<=== error controller cart')
        next(err)
      })
  }

  static getAll(req, res, next) {
    Cart.findAll({
      where: {
        userId: req.userData.id,
        status: false
      },
      attributes: ['id', 'productId', 'userId', 'quantity'],
      include: [Product, User],
      order: [['id']]
    })
      .then(carts => {
        res.status(200).json(carts)
      })
      .catch(err => {
        console.log(err, '<=== error get all carts')
        next(err)
      })
  }

  static delete(req, res, next) {
    const { id } = req.params
    Cart.findByPk(id)
    // Cart.findOne({
    //   where: { id }
    // })
      .then(cart => {
        console.log(cart, '<=== cart di delete controller')
        if (!cart) throw { msg: 'cart not found'}
        cart.destroy()
        res.status(200).json({
          cart,
          msg: 'success deleted cart'
        })
      })
      .catch(err => {
        console.log(err, '<== error delete product')
        next(err)
      })
  }

  static update(req, res, next) {
    // const price = req.body.quantity * req.body.price
    // const { id }
    // find one cart
    // quantitiy > dari stock ga ? kalo lebih besar gaboleh
    // dari sini versi sebelumnya
    // Cart.update({
    //   quantity: req.body.quantity,
    // }, {
    //   where: {
    //     id: req.params.id
    //   }
    // })
    //   .then(cart => {
    //     console.log(cart, '<=== update cart di controller')
    //     res.status(200).json({
    //       cart,
    //       msg: 'success update cart'
    //     })
    //   })
    //   .catch(err => {
    //     console.log(err, '<=== error update')
    //     next(err)
    //   })
    // end dari versi sebelumnya
    const { id } = req.params
    const { quantity } = req.body
    Cart.findOne({
      where: { id },
      include: { model: Product }
    })
      .then(cart => {
        if (!cart) throw { msg: 'cart not found'}
        if (cart.Product.stock < quantity) {
          throw {msg : 'maximum stock limit'}
        } else {
          cart.quantity = req.body.quantity
          return cart.update({ quantity })
        }
      })
      .then(cart => {
        res.status(200).json(cart)
      })
      .catch(err => {
        console.log(err, '<=== error update cart di controller')
        next(err)
      })
  }

  
}

module.exports = CartController