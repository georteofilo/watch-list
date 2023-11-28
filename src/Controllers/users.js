const db = require('../Config/database')
const encrypt = require('bcrypt');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const passCrypt = await encrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: passCrypt
    }
    const registeredUser = await db('users').insert(newUser).returning(['id', 'name', 'email'])

    return res.status(201).json(registeredUser[0])

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ mensagem: "Erro no servidor"})
  }
}

module.exports = {
  registerUser
}