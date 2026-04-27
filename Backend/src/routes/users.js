const {Router} = require('express')
const users = Router()
const multer = require('multer')
const storage = require('../utils/multer/storage.js')
const controllers = require('../controllers/users.js')
const passport = require('../config/passport-jwt/passport-jwt.js')
const upload = multer({storage: storage}) //shouldn't be portraits, change it later to either port or background


users.get('/:id', (req, res) => controllers.getUser(req, res))

users.get('/chats/:usersIds', passport.authenticate('jwt', {session:false}), (req, res) => controllers.getUsersInList(req, res))

users.get('/', (req, res) => controllers.getAllUsers(req, res))

users.post('/log-in', (req, res) => controllers.postLogin(req, res))

users.post('/', (req, res) => controllers.postNewUser(req, res))

users.put('/', passport.authenticate('jwt', {session:false}), upload.single('portrait'), (req, res) => controllers.updateUser(req, res)) 

users.delete('/all', (req, res) => controllers.deleteAllUsers(req, res))

users.delete('/', passport.authenticate('jwt', {session:false}), (req, res) => controllers.deleteUser(req, res))

module.exports = users