const { Product } = require('../models')

class ProductController {
  static create(req, res, next) {
    const { name, image_url, price, stock } = req.body
    
    Product.create({
      name, image_url, price, stock
    })
      .then(product => {
        // console.log(product, '<<< create product di controller')
        res.status(201).json({
          id: product.id,
          name: product.name,
          image_url: product.image_url,
          price: product.price,
          stock: product.stock
        })
      })
      .catch(err => {
        console.log(err, '<<< error create di controller')
        next(err)
      })
  }

  static update(req, res, next) {
    const { id } = req.params
    Product.findByPk(id)
      .then(product => {
        // console.log(product, '<<< update populate find by id di controller product')
        if (!product) throw { err: 'product not found', statusCode: 404}
        return product.update({
          ...product,
          ...req.body
        })
      })
      .then(product => {
        // console.log(product, '<<< berhasil update di controller product')
        res.status(200).json(product)
      })
      .catch(err => {
        // console.log(err, '<<< error update di product controller')
        next(err)
      })
  }

  static findAll(req, res, next) {
    Product.findAll({
      sort: [['id', 'DESC']]
    })
      .then(product => {
        // console.log(product, '<<< find all product di controller')
        product = product.map(el => {
          return {
            id: el.id,
            name: el.name,
            image_url: el.image_url,
            price: el.price,
            stock: el.stock
          }
        })
        res.status(200).json(product)
      })
      .catch(err => {
        // console.log(err, '<<< error find all di controller')
        next(err)
      })
  } 

  static findById(req, res, next) {
    Product.findByPk(req.params.id) 
      .then(product => {
        if (!product) throw { msg: 'product not found', statusCode: 404}
        res.status(200).json(product)
      })
      .catch(err => next(err))
  }
  static deleteProduct(req, res, next) {
    const { id } = req.params
    Product.findByPk(id)
      .then(product => {
        // console.log(product, '<<< delete product di controller')
        if (!product) throw { msg: 'product not found', statusCode: 404}
        product.destroy()
        res.status(200).json({ message: 'success delete product'})
      })
      .catch(err => {
        console.log(err, '<<< error delete di controller')
        next(err)
      })
  }

}

module.exports = ProductController