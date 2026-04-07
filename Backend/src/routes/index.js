const { Router } = require('express')
const index = Router()
const messages = require('/messages')
const users = require('/users')


index.get('/users/', users)

index.get('/messages/', messages)

module.exports = index;