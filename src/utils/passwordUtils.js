/**
 * Returns promise
 */

// With “salt round” they actually mean the cost factor.
// The cost factor controls how much time is needed to calculate a single BCrypt hash.
// The higher the cost factor, the more hashing rounds are done.
// Increasing te cost factor by 1 doubles the necessary time.
// The more time is necessary, the more difficult is brute-forcing.
const config = require('../../config')
const bcrypt = require('bcrypt')
const saltRounds = config.BCRYPT_SALT_ROUNDS;

const pass2hash = function (pass) {
    return bcrypt.hash(pass, saltRounds)
}

const compare2hash = function (pass, hash) {
    return bcrypt.compare(pass, hash)
}

module.exports = {
    pass2hash, compare2hash
}
