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

  try {
    const response = await db('users').select('id').where({email})

    if(response.length > 0){
      return res.status(400).json({ message: "Email já cadastrado." })
    }

    next()
  } catch (error) {
    console.log(error.message)
    return res.status(500)
  }
}

module.exports = {
  validateFieldsUser,
  isEmailAlreadyExists
}