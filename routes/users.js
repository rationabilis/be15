const { celebrate, Joi } = require('celebrate');
const usersRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getAllUsers, getUser, renewUser, renewUserAvatar,
} = require('../controllers/user');

usersRouter.get('/:id',
  celebrate({
    headers: Joi.object({
      'content-type': Joi.string().required(),
    }).unknown(),
    params: Joi.object().keys({
      id: Joi.string().alphanum().length(24).required(),
    }),
  }),
  auth, getUser);

usersRouter.get('/',
  celebrate({
    headers: Joi.object({
      'content-type': Joi.string().required(),
    }).unknown(),
  }),
  auth, getAllUsers);

usersRouter.patch('/me',
  celebrate({
    headers: Joi.object({
      'content-type': Joi.string().required(),
    }).unknown(),
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
      avatar: Joi.string().required().uri(),
    }),
  }),
  auth, renewUser);

usersRouter.patch('/me/avatar',
  celebrate({
    headers: Joi.object({
      'content-type': Joi.string().required(),
    }).unknown(),
    body: Joi.object().keys({
      avatar: Joi.string().required().uri(),
    }),
  }),
  auth, renewUserAvatar);

module.exports = usersRouter;
