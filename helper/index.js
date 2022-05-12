
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
module.exports = {
    getToken : ({ id, firstName,lastName, email }) =>
    jwt.sign(
      {
        id,
        firstName,
        lastName,
        email
      },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    ),
    getUser : (token) => {
        if (token) {
          try {
            return jwt.verify(token,  process.env.SECRET_KEY);
          } catch (err) {
            return { error: true, msg: "Session invalid",err:err };
          }
      
        }
      
      }
} 