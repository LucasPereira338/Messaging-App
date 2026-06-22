const jwt = require('jsonwebtoken');
const crypto = require('crypto')

function generateAccessToken(user) {
    return jwt.sign({id: user.id}, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '600m'
    });
}


module.exports = {
    generateAccessToken
}