const jwt = require('jsonwebtoken');

function generateAccessToken(dataObject) {
    const accessToken = jwt.sign(dataObject, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
    return accessToken
}

function generateRefreshToken(dataObject) {
    const refreshToken = jwt.sign(dataObject, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
    return refreshToken
}

function verifyAccessToken(token){
    return jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
}

function verifyRefreshToken(token){
    return jwt.verify(token,process.env.REFRESH_TOKEN_SECRET)
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}