const { Router } = require('express')
const index = Router()
const messages = require('./messages.js')
const users = require('./users.js')
const groups = require('./groups.js')
const chats = require('./chats.js')


index.use('/users', users)

index.use('/messages', messages)

index.use('/groups', groups)

index.use('/chats', chats)

index.get('/fail', (req, res) => res.json('auth failed'))

index.get('/', (req, res) => res.json({status: 'server on'}))

module.exports = index;