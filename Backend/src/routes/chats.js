const {Router} = require('express');
const chats = Router({mergeParams: true});
const passport = require('../config/passport-jwt/passport-jwt.js');
const controllers = require('../controllers/chats.js');

chats.get('/:ids/members', passport.authenticate('jwt', {session:false}), (req, res) => controllers.getChatsMembers(req, res));

chats.get('/:id/messages', passport.authenticate('jwt', {session:false}), (req, res) => controllers.getChatMessages(req, res));

chats.get('/active', passport.authenticate('jwt', {session:false}), (req, res) => controllers.getUserActiveChats(req, res));

chats.get('/private', passport.authenticate('jwt', {session:false}), (req, res) => controllers.getUserPrivateChats(req, res));

chats.get('/groups', passport.authenticate('jwt', {session:false}), (req, res) => controllers.getUserGroupChats(req, res));

chats.get('/:id', passport.authenticate('jwt', {session:false}), (req, res) => controllers.getChat(req, res));

chats.get('/', passport.authenticate('jwt', {session:false}), (req, res) => controllers.getUserChats(req, res));

chats.post('/', passport.authenticate('jwt', {session:false}), (req, res) => controllers.postChat(req, res));

module.exports = chats