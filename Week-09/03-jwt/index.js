const jwt = require('jsonwebtoken');
const jwtPassword = 'secret_key';

function signShortLivedToken(username) {
  return jwt.sign(
    { username },
    jwtPassword,
    { expiresIn: '1m' }
  );
}

function checkTokenStatus(token) {
  try {
    jwt.verify(token, jwtPassword);
    return "valid";
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return "expired";
    }
    return "invalid";
  }
}

module.exports = {
  signShortLivedToken,
  checkTokenStatus,
  jwtPassword
};