const {Router} = require('express')
const groups = Router({mergeParams: true})
const upload = require('../utils/multer/multer.js')
const {uploadProfileImg} = require('../utils/cloud/storage.js')
const passport = require('../config/passport-jwt/passport-jwt.js')
const controllers = require('../controllers/groups.js')
const chats = require('./chats.js');

groups.get('/:id/messages', passport.authenticate('jwt', {session:false}), (req, res) => controllers.getGroupMessages(req, res))

groups.get('/:id/users', passport.authenticate('jwt', {session:false}), (req, res) => controllers.getGroupMembers(req, res));

groups.get('/:id', passport.authenticate('jwt', {session:false}), (req, res) => controllers.getGroup(req, res));

groups.get('/', passport.authenticate('jwt', {session:false}), (req, res) => controllers.getUserGroups(req, res));

groups.post('/', passport.authenticate('jwt', {session:false}), uploadProfileImg, (req, res) => controllers.postGroup(req, res));

groups.put('/:id/quit', passport.authenticate('jwt', {session:false}),  (req, res) => controllers.leaveGroup(req, res));

groups.put('/:id/', passport.authenticate('jwt', {session:false}), uploadProfileImg, (req, res) => controllers.updateGroup(req, res));

groups.delete('/:id', passport.authenticate('jwt', {session:false}), (req, res) => controllers.deleteGroup(req, res));

module.exports = groups