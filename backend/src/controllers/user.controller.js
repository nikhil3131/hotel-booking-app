const { customError } = require('../utils/customError');
const { User } = require('../models/user.model');
const { sendAccessCookie, sendRefreshCookie } = require('../utils/sendCookies');
const { generateRefreshToken } = require('../utils/jwt');

// registering a new user
async function registerUser(req, res) {
    // saving user data into the database
    const userInfo = await User.create(req.body, {
        fields: ['email', 'password', 'firstName', 'lastName'],
    });

    // data received from server
    const userData = {
        id: userInfo.id,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
    }
    
    // saving refresh token in user model
    userInfo.refreshToken = generateRefreshToken({userData})
    await userInfo.save()

    // sending refresh token and access token inside the cookies form server to client
    sendAccessCookie(userData, res)
    sendRefreshCookie(userData, res)

    // response
    res.json({...userData});
}

module.exports = {
    registerUser,
};
