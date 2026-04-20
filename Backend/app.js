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

/*
}*/

/*app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173" );
    res.setHeader("Access-Control-Allow-Credentials", "true")
    res.setHeader("Vary", "Origin")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})*/

app.use('/', index)

module.exports = app;