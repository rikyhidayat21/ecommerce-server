const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

async function authentication(req, res, next) {
  try {
    let { access_token } = req.headers
    let decoded = verifyToken(access_token)
    console.log(decoded, '<<< ini decoded')
    let user = await User.findOne({
      where : { email: decoded.email }
    })
    if(!user) throw { msg: 'authentication failed', statusCode: 401}
    req.userData = user
    console.log(req.userData.id, '<=== req.userData.id di auth')
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authentication