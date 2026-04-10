const { Router } = require('express')
const index = Router()
const messages = require('./messages.js')
const users = require('./users.js')

index.use('/users', users)

index.use('/messages', messages)

index.get('/fail', (req, res) => res.json('auth failed'))

index.get('/', (req, res) => res.json({status: 'server on'}))

module.exports = index;