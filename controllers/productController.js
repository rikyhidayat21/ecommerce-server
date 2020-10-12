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
}

module.exports = ProductController