const {Router} = require('express')
const users = Router()
const controllers = require('../controllers/users.js')

users.get('/:id', (req, res) => controllers.getUser(req, res))

users.get('/chats/:usersIds', (req, res) => controllers.getUsersInList(req, res))

users.get('/', (req, res) => controllers.getAllUsers(req, res))

users.post('/', (req, res) => controllers.postNewUser(req, res))

users.put('/', (req, res) => controllers.updateUser(req, res)) 

users.delete('/all', (req, res) => controllers.deleteAllUsers(req, res))

users.delete('/', (req, res) => controllers.deleteUser(req, res))

module.exports = users