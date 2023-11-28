const jwt = require('jsonwebtoken')
const db = require('../Config/database')

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers

  if(!authorization){
    return res.status(401).json({ message: "Não autorizado"})
  }

  try {
    const token = authorization.replace("Bearer ", "").trim()

    const { id } = jwt.decode(token, process.env.JWT_PASS)

    const user = await db('users').select(['id', 'name', 'email']).where({id}).first()

    if(!user || user.length === 0){
      return res.status(401).json("Não autorizado.")
    }

    req.user = user
    next()
  } catch (error) {
    console.log(error.message)
    return res.status(500)
  }
}

module.exports = {
  verifyToken
}


