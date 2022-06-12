const jwt = require('jsonwebtoken');

const secret = 'myCat';

// const jwtConfig = {
//   expiresIn: '7d',
// };

const payload = {
  sub: 1,
  role: 'customer',
};

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token);
