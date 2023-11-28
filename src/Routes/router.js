const express = require("express");
const { registerUser } = require("../Controllers/users");
const {
  validateFieldsUser,
  isEmailAlreadyExists,
  validateFieldsLogin,
} = require("../Middleware/validate");
const { login } = require("../Controllers/login");
const router = express();

router.post("/users", validateFieldsUser, isEmailAlreadyExists, registerUser);

router.post("/login", validateFieldsLogin, login);

module.exports = router;
