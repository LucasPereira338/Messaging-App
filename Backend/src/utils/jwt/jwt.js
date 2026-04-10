const jwt = require('jsonwebtoken');
const crypto = require('crypto')

function generateAccessToken(user) {
    return jwt.sign({id: user.id}, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '60m'
    });
}


module.exports = {
    generateAccessToken
}