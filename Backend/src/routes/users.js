const {Router} = require('express')
const users = Router()

users.get('/', (req, res) => controllers.getAllUsers(req, res))

module.exports = users