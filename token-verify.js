const jwt = require('jsonwebtoken');

const secret = 'myCat';
const token = 'weasdwe';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
