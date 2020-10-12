const { User } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static login(req, res, next) {
    const { email, password } = req.body
    console.log(req.body, '<<< ini req body usercontroller')
    User.findOne({
      where : { email }
    })
      .then(user => {
        // console.log(user, '<< ini user di then')
        if(!user) throw { msg : 'invalid email or password'}
        let comparePassword = comparePass(password, user.password)
        if(!comparePassword) throw { msg: 'invalid email or password'}
        let payLoad = {
          id: user.id,
          email: user.email
        }
        let access_token = generateToken(payLoad)
        
        res.status(200).json({ access_token })
      })
      .catch(err =>{
        console.log(err, '<<< error login user controller')
        next(err)
      } )
  }
}

module.exports = UserController