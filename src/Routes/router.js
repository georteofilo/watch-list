const express = require('express');
const { registerUser } = require('../Controllers/users');
const router = express()

router.post('/users', registerUser)

module.exports = router