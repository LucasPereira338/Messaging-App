const {Router} = require('express')
const messages = Router()
const controllers = require('../controllers/messages.js')

messages.get('/:id', (req, res) => controllers.getMessage(req, res))

messages.get('/messages/user/:userId', (req, res) => controllers.getAllUserMessages(req, res))

messages.get('/author/:authorId', (req, res) => controllers.getMessagesByAuthor(req, res))

messages.get('/receiver/:receiverId', (req, res) => controllers.getMessagesByReceiver(req, res))

messages.get('/', (req, res) => controllers.getAllMessages(req, res))

messages.post('/', (req, res) => controllers.postNewMessage(req, res))

messages.put('/', (req, res) => controllers.updateMessage(req, res)) 

messages.del('/all', (req, res) => controllers.deleteAllMessages(req, res))

messages.del('/', (req, res) => controllers.deleteMessage(req, res))

module.exports = messages