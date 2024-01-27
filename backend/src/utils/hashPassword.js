const bcrypt = require('bcryptjs')

async function hashPassword(password){
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

async function comparePassword(password, hashPassword){
    return await bcrypt.compare(password, hashPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}