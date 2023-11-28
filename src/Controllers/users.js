const db = require("../Config/database");
const encrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const salts = parseInt(process.env.SALT);

  try {
    const passCrypt = await encrypt.hash(password, salts);
    const newUser = {
      name,
      email,
      password: passCrypt,
    };
    const registeredUser = await db("users")
      .insert(newUser)
      .returning(["id", "name", "email"]);

    return res.status(201).json(registeredUser[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
};

const getUser = (req, res) => {
  const { user } = req;
  return res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { id } = req.user;
  const salt = parseInt(process.env.SALT);

  try {
    const passCrypt = await encrypt.hash(password, salt);
    const user = {
      name,
      email,
      password: passCrypt,
    };
    const updatedUser = await db("users")
      .update(user)
      .where({ id })
      .returning(["id", "name", "email"]);

    return res.status(201).json(updatedUser);
  } catch (error) {
    console.log(error.message);
    return res.status(500);
  }
};

module.exports = {
  registerUser,
  getUser,
  updateUser
};
