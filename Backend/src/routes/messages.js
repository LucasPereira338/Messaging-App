const {Router} = require('express')
const messages = Router()
const multer = require('multer')
const storage = require('../utils/multer/storage.js')
const upload = multer({storage: storage}) 
const controllers = require('../controllers/messages.js')
const passport = require('../config/passport-jwt/passport-jwt.js')

/*messages.get('/:authorId/chat/:receiverId', passport.authenticate('jwt', {session: false}), 
(req, res) => controllers.getMessagesByChat(req, res))*/

messages.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => controllers.getMessage(req, res))

/*messages.get('/user/:userId', passport.authenticate('jwt', {session: false}), 
(req, res) => controllers.getAllUserChatPartners(req, res))*/

messages.get('/author/:authorId', passport.authenticate('jwt', {session: false}), 
(req, res) => controllers.getMessagesByAuthor(req, res))

messages.get('/', (req, res) => controllers.getMessages(req, res)) // perhaps i should remove this

messages.post('/', passport.authenticate('jwt', {session: false}), upload.single('portrait'), (req, res) => controllers.postNewMessage(req, res))

messages.put('/:id', passport.authenticate('jwt', {session: false}), (req, res) => controllers.updateMessage(req, res)) 

messages.delete('/all', (req, res) => controllers.deleteAllMessages(req, res))

messages.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => controllers.deleteMessage(req, res))

module.exports = messages