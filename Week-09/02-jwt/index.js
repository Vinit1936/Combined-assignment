/**
 * Generates a JWT that includes a user's role (admin or guest).
 * * @param {string} username - The user's email.
 * @param {string} role - The user's role, must be either 'admin' or 'guest'.
 * @returns {string|null} A JWT if role is valid; otherwise null.
 */
const jwt = require('jsonwebtoken');

const jwtPassword = 'secret_key';

function signJwtWithRole(username, role) {
    if (role !== 'admin' && role !== 'guest') {
        return null;
    }

    return jwt.sign({ username, role }, jwtPassword);
}

function isAdmin(token) {
    try {
        const payload = jwt.verify(token, jwtPassword);
        return payload.role === 'admin';
    } catch (e) {
        return false;
    }
}

module.exports = {
    signJwtWithRole,
    isAdmin,
    jwtPassword
};