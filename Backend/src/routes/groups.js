const {Router} = require('express')
const groups = Router({mergeParams: true})
const passport = require('../config/passport-jwt/passport-jwt.js')
const controllers = require('../controllers/groups.js')
const chats = require('./chats.js');

groups.get('/:id/messages', passport.authenticate('jwt', {session:false}), (req, res) => controllers.getGroupMessages(req, res))

groups.get('/:id/users', passport.authenticate('jwt', {session:false}), (req, res) => controllers.getGroupMembers(req, res));

groups.get('/:id', passport.authenticate('jwt', {session:false}), (req, res) => controllers.getGroup(req, res));

groups.get('/', passport.authenticate('jwt', {session:false}), (req, res) => controllers.getUserGroups(req, res));

groups.put('/:id', passport.authenticate('jwt', {session:false}), (req, res) => controllers.putMembersInGroup(req, res));

groups.post('/', passport.authenticate('jwt', {session:false}), (req, res) => controllers.postGroup(req, res));

module.exports = groups