const express = require("express");
const { registerUser, getUser } = require("../Controllers/users");
const {
  validateFieldsUser,
  isEmailAlreadyExists,
  validateFieldsLogin,
} = require("../Middleware/validate");
const { login } = require("../Controllers/login");
const { verifyToken } = require("../Middleware/auth");
const router = express();

router.post("/users", validateFieldsUser, isEmailAlreadyExists, registerUser);

router.post("/login", validateFieldsLogin, login);

router.use(verifyToken)

router.get("/users", getUser)

module.exports = router;
