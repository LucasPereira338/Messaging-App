const {prisma} = require('../../../lib/prisma.js')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['token'];
    }
    return token;
};

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_ACCESS_SECRET;

passport.use(
     new JwtStrategy(opts, async function (jwt_payload, done) {
          try {
               
               const user = await prisma.user.findUnique({where: {id: jwt_payload.id}})
               
               if(user) {
                    await prisma.user.update({where: {id: user.id}, data: {lastActive: new Date(), updatedAt: user.updatedAt}})
                    return done(null, user)
               } else {
                    return done(null, false);
               }
          } catch(err) {
               return done(err, false)
          }
               
          })
)

module.exports = passport;
