require('dotenv').config()
const express = require('express')
const router = require('./Routes/router')
const app = express()


app.use(express.json())
app.use(router)

const port = process.env.PORT || 3000

app.listen(port)