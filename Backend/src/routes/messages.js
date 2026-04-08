const {Router} = require('express')
const messages = Router()
const controllers = require('../controllers/messages.js')

messages.get('/:authorId/chat/:receiverId', (req, res) => controllers.getMessagesByChat(req, res))

messages.get('/:id', (req, res) => controllers.getMessage(req, res))

messages.get('/user/:userId', (req, res) => controllers.getAllUserMessages(req, res))

messages.get('/author/:authorId', (req, res) => controllers.getMessagesByAuthor(req, res))

messages.get('/receiver/:receiverId', (req, res) => controllers.getMessagesByReceiver(req, res))

messages.get('/', (req, res) => controllers.getAllMessages(req, res))

messages.post('/', (req, res) => controllers.postNewMessage(req, res))

messages.put('/', (req, res) => controllers.updateMessage(req, res)) 

messages.delete('/all', (req, res) => controllers.deleteAllMessages(req, res))

messages.delete('/', (req, res) => controllers.deleteMessage(req, res))

module.exports = messages