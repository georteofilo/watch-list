const express = require('express');
const router = express()

router.get('/', (req, res) => {
  return res.send('Tudo ok')
})

module.exports = router