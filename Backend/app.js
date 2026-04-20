const express = require('express')
const app = express()
const path = require('path')
const index = require('./src/routes/index.js')
const cors = require('cors');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/assets', express.static(path.join(__dirname, "assets")))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*" );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
app.use('/', index)

module.exports = app;