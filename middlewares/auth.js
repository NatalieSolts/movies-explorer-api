const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.SECRET_KEY : 'secret-key');
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      next(UnauthorizedError('Некорректный токен'));
    }
    return next(UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
