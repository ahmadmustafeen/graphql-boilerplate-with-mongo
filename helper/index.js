
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
module.exports = {
    getToken : ({ id, username, email }) =>
    jwt.sign(
      {
        id,
        username,
        email
      },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    )
} 