const {Router} = require('express')
const chats = Router({mergeParams: true})
const passport = require('../config/passport-jwt/passport-jwt.js')
const controllers = require('../controllers/chats.js');

chats.get('/:id/users', passport.authenticate('jwt', {session:false}), (req, res) => controllers.getChatMembers(req, res));

chats.get('/:id/messages', passport.authenticate('jwt', {session:false}), (req, res) => controllers.getChatMessages(req, res));

chats.get('/', passport.authenticate('jwt', {session:false}), (req, res) => controllers.getUserChats(req, res));

chats.get('/:id', passport.authenticate('jwt', {session:false}), (req, res) => controllers.getChat(req, res));

chats.post('/', passport.authenticate('jwt', {session:false}), (req, res) => controllers.postChat(req, res));

module.exports = chats