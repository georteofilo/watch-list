const express = require("express");
const { registerUser } = require("../Controllers/users");
const {
  validateFieldsUser,
  isEmailAlreadyExists,
} = require("../Middleware/validate");
const router = express();

router.post("/users", validateFieldsUser, isEmailAlreadyExists, registerUser);

module.exports = router;
