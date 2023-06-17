const router = require('express').Router();
const {
  getMe,
  updateUserInfo,
} = require('../controllers/users');

const { userInfoValidate } = require('../middlewares/validators/userValidators');

// возвращает информацию о текущем пользователе
router.get('/me', getMe);

// PATCH /users/me — обновляет профиль
router.patch('/me', userInfoValidate, updateUserInfo);

module.exports = router;
