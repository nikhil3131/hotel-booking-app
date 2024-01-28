const router = require('express').Router();
const { registerUser } = require('../controllers/user.controller');

router.route('/register').post(registerUser)

module.exports = router