const request = require('supertest');
const app = require('../app');
const { User, Product } = require('../models')
const { generateToken } = require('../helpers/jwt');
const { post } = require('../app');

let product_data = {
  name: 'Logitech G502',
  image_url: 'https://resource.logitechg.com/w_1800,c_limit,f_auto,q_auto:best,f_auto,dpr_auto/content/dam/gaming/en/products/g502-hero/g502-hero-intro.png?v=1',
  price: 500000,
  stock: 7
}
let product = {}
let initial_token_admin = ''
let initial_token_user = ''

afterAll(function(done) {
  if(process.env.NODE_ENV == 'test') {
    User.destroy({ truncate: true })
      .then(_=> {
        done()
      })
      .catch(err => done(err))
  }
})

beforeAll(function(done) {
  User.create({
    email: 'admin@mail.com',
    password: 'kumpay',
    role: 'admin'
  })
    .then(user => {
      // console.log(user, '<<< then user di beforeAll product test')
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role
      }
      initial_token_admin = generateToken(payload)
      // console.log(initial_token, '<<< initial token yang dari payload yang dari controller berarti')
      done()
      return User.create({
        email: 'user@mail.com',
        password: 'user',
        role: 'customer'
      })
    })
    .then(user => {
      const newPayload = {
        id: user.id,
        email: user.email,
        role: user.role
      }
      initial_token_user = generateToken(newPayload)
      done()
    })
    .catch(err => {
      console.log(err, '<<< error create test')
      done(err)
    })
})

describe('Create Product / Success Case', () => {
  test('Should send object with keys: id, image_url, price, stock', (done) => {
    request(app)
      .post('/products')
      .set('access_token', initial_token_admin)
      .send(product_data)
      .end((err, res) => {
        if (err) throw err;
        else {
          // console.log(res.body, '<<< res body di describe test product')
          expect(res.status).toBe(201)
          expect(res.body).toHaveProperty('id', expect.any(Number))
          expect(res.body).toHaveProperty('name', product_data.name)
          expect(res.body).toHaveProperty('image_url', product_data.image_url)
          expect(res.body).toHaveProperty('price', product_data.price)
          expect(res.body).toHaveProperty('stock', product_data.stock)
          done()
        }
      })
  })
})

describe('Create Product / Error Case', () => {
  test('Failed because access_token not provided', (done) => {
    request(app)
      .post('/products')
      .send(product_data)
      .end((err, res) => {
        if (err) throw err;
        else {
          const errors = ['Failed to authenticate']
          console.log(res.body, '<<< res body access token not provided')
          expect(res.status).toBe(401)
          expect(res.body).toHaveProperty("errors", expect.any(Array))
          expect(res.body.errors).toEqual(errors);
          done()
        }
      })
  })
  test('Failed because access_token not match with admin access_token', (done) => {
    request(app)
      .post('/products')
      .set('access_token', initial_token_user)
      .send(product_data)
      .end((err, res) => {
        if (err) throw err;
        else {
          const errors = ['Failed to authorize']
          console.log(res.body, '<<< res body access_token not match')
          console.log(res.status, '<<< res status di product js')
          expect(res.status).toBe(403);
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body.errors).toEqual(errors);
          done();
        }
      })
  })
  test('Failed because empty fields', (done) => {
    request(app)
      .post('/products')
      .set('access_token', initial_token_admin)
      .send({})
      .end((err, res) => {
        if (err) throw err;
        else {
          const errors = [
            "name is required",
            "image_url is required",
            "price is required",
            "stock is required"
          ];
          expect(res.status).toBe(400);
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body.errors).toEqual(errors);
          done()
        }
      })
  })
  test('Failed because stock is not positive integer', (done) => {
    const product_data_negative_stock = {
      ...product_data,
      stock: -1
    }
    request(app)
      .post('/products')
      .set('access_token', initial_token_admin)
      .send(product_data_negative_stock)
      .end((err, res) => {
        if (err) throw err;
        else {
          const errors = ['stock must be a positive integer']
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body.errors).toEqual(errors)
          done();
        }
      })
  })
  test('Failed because invalid data types', (done) => {
    const product_invalid_data_types = {
      ...product_data,
      stock: '1x',
      price: '10k'
    }
    request(app)
      .post('/products')
      .set('access_token', initial_token_admin)
      .send(product_invalid_data_types)
      .end((err, res) => {
        if (err) throw err;
        else {
          const errors = [
            'price must be a positive integer',
            'stock must be a positive integer'
          ]
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body.errors).toEqual(errors)
          done();
          
        }
      })
  })

})

