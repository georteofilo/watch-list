const db = require('../Config/database')
const jwt = require('jsonwebtoken')
const encrypt = require('bcrypt')

const login = async (req, res) => {
  const { email, password} = req.body

  try {
    const user = await db('users').select('*').where({email}).first()

    if(!user || user.length === 0){
      return res.status(400).json({ message: 'Email e/ou senha inválidos.'})
    }

    const passCrypt = await encrypt.compare(password, user.password)

    if(!passCrypt){
      return res.status(400).json({ message: 'Email e/ou senha inválidos.'})
    }

    const token = jwt.sign({id: user.id}, process.env.JWT_PASS, { expiresIn: '2h'})

    const { password: _, ...activeUser} = user

    return res.status(200).json({user:activeUser, token})

  } catch (error) {
    console.log(error.message)
    return res.status(500)
  }
}

module.exports = {
  login
}