const express = require('express')
const app = express()
const path = require('path')
const index = require('./src/routes/index.js')
const cors = require('cors');
const corsOptions = require('./src/config/cors/corsOptions.js')

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/assets', express.static(path.join(__dirname, "assets")))

app.use('/', index)

module.exports = app;