const loginRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/user');

loginRouter.post('/',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login);

module.exports = loginRouter;
