const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');
const { secretKey } = require('../utils/config');
const { unauthorized } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized(unauthorized);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : secretKey);
  } catch (err) {
    throw new Unauthorized(unauthorized);
  }
  req.user = payload;
  next();
  return null;
};
