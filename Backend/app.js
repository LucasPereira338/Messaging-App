const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./src/config/cors/corsOptions.js');
const index = require('./src/routes/index.js');

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use('/assets', express.static(path.join(__dirname, "assets")))

app.use('/', index)

module.exports = app;