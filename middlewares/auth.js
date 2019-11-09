const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, '2fa5a3af71b147c0e696aa8ae458831ab64482d236667469bec82a548e646aeb');
  } catch (err) {
    throw new UnauthorizedError('Неправильные почта или пароль');
  }

  req.user = payload;

  next();
};

module.exports = auth;
