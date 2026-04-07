const express = require('express')
const app = express()
const index = require('./src/routes/index.js')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', index)

module.exports = app;