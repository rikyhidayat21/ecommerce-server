const request = require('supertest');
const app = require('../app');
const { User, Product } = require('../models')
const { generateToken } = require('../helpers/jwt');

let product_data = {
  name: 'Logitech G502',
  image_url: 'https://resource.logitechg.com/w_1800,c_limit,f_auto,q_auto:best,f_auto,dpr_auto/content/dam/gaming/en/products/g502-hero/g502-hero-intro.png?v=1',
  price: 500000,
  stock: 7
}

let initial_token = ''

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
      initial_token = generateToken(payload)
      // console.log(initial_token, '<<< initial token yang dari payload yang dari controller berarti')
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
      .set('access_token', initial_token)
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

