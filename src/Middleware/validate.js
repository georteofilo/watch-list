const db = require("../Config/database")

const validateFieldsUser = async (req, res, next) => {
  const { name, email, password } = req.body

  try {
    if(!name){
      return res.status(400).json({ message: "O nome é obrigatório!"})
    }
    if(!email){
      return res.status(400).json({ message: "O email é obrigatório!"})
    }
    if(!password){
      return res.status(400).json({ message: "A senha é obrigatória!"})
    }
    next()
  } catch (error) {
    console.log(error.message)
    return res.status(500)
  }
}

const isEmailAlreadyExists = async (req, res, next) => {
  const { email } = req.body
  const { user } = req

  try {
    let response
    if(!user){
      response = await db('users').select('id').where({email})
    } else {
      response = await db('users').select('id').where({email}).andWhere('id', '<>', user.id)
    }

    if(response.length > 0){
      return res.status(400).json({ message: "Email já cadastrado." })
    }

    next()
  } catch (error) {
    console.log(error.message)
    return res.status(500)
  }
}

const validateFieldsLogin = async (req, res, next) => {
  const { email, password} = req.body

  try {
    if(!email){
      return res.status(400).json({ message: 'Email e/ou senha inválidos.'} )
    }
    if(!password){
      return res.status(400).json({ message: "Email e/ou senha inválidos."})
    }
    next()
  } catch (error) {
    console.log(error.message)
    return res.status(500)
  }
}

module.exports = {
  validateFieldsUser,
  isEmailAlreadyExists,
  validateFieldsLogin
}