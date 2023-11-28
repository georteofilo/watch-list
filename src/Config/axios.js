const axios = require('axios')

const instance = axios.create({
  baseURL: `http://www.omdbapi.com/`,
  headers: {
    'Content-Type': 'application/json',
  }
})

module.exports = instance