const request = require('supertest')
const app = require('../app')
const { User } = require('../models')



let user_data = {
  email: 'admin@mail.com',
  password: 'kumpay',
  role: 'admin'
}


beforeAll(function(done) { //
  User.create({
    email: 'admin@mail.com',
    password: 'kumpay',
    role: 'admin'
  })
    .then(_=> {
      done()
    })
    .catch(err => done(err))
})

// afterAll untuk menanggulangin email uniq, untuk delete data user ( cleand db)
afterAll(function(done) {
  if(process.env.NODE_ENV == 'test') {
    User.destroy({ truncate: true })
      .then(_=> {
        done()
      })
      .catch(err => done(err))
  }
})

describe('Login / Success Case', () => {
  test('should send an object with keys: access_token', (done) => {
    request(app)
      .post('/login')
      .send(user_data)
      .end((err, res) => {
        if(err) throw err;
        else {
          // console.log(res.body, '<<<resbody di test login')
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty('access_token', expect.any(String))
          expect(res.body).not.toHaveProperty('email')
          expect(res.body).not.toHaveProperty('password')

          done()
        }
      })
  })
})

describe('Login / Error Case', () => {
  test('Failed because invalid email', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'salahemail@mail.com',
        password: 'kumpay'
      })
      .end((err, res) => {
        if(err) throw err;
        else {
          const errors = ['invalid email or password']
          // console.log(res.body, '<<< errors login user test')
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty("errors", expect.any(Array))
          expect(res.body.errors).toEqual(errors);
          
          done()
        }
      })
  })
  test('Failed because invalid password', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'admin@mail.com',
        password: 'kumis'
      })
      .end((err, res) => {
        const errors = ['invalid email or password']
        if(err) throw err;
        else {
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body.errors).toEqual(errors);
          done()
        }
      })
  })
})
