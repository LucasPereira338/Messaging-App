const {Router} = require('express')
const users = Router()
const multer = require('multer')
const storage = require('../utils/multer/storage.js')
const controllers = require('../controllers/users.js')
const passport = require('../config/passport-jwt/passport-jwt.js')
const upload = multer({storage: storage}) //shouldn't be portraits, change it later to either port or background
const groups = require('./groups.js')
const chats = require('./chats.js')

users.use('/:id/groups', groups)

users.use('/:id/chats', chats)

users.get('/:id', (req, res) => controllers.getUser(req, res))

users.get('/list/:usersIds', passport.authenticate('jwt', {session:false}), (req, res) => controllers.getUsersInList(req, res))

users.get('/',  (req, res) => controllers.getUsers(req, res))

users.post('/log-in', (req, res) => controllers.postLogin(req, res))

users.post('/', upload.single('portrait'), (req, res) => controllers.postNewUser(req, res))

users.put('/:id', passport.authenticate('jwt', {session:false}), upload.single('portrait'), (req, res) => controllers.updateUser(req, res)) 

users.delete('/all', (req, res) => controllers.deleteAllUsers(req, res))

users.delete('/:id', passport.authenticate('jwt', {session:false}), (req, res) => controllers.deleteUser(req, res))

module.exports = users