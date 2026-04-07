const {Router} = require('express')
const messages = Router()

messages.get('/', (req, res) => controllers.getAllMessages(req, res))

module.exports = messages