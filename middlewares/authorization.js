
async function authorization(req, res, next) {
  try {
    console.log(req.userData.role, '<<< req userData role di middleware authorization')
    if (req.userData.role !== 'admin') throw { name: "AuthorizationFailed"}
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authorization