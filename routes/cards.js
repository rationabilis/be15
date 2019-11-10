const { celebrate, Joi } = require('celebrate');
const cardsRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/card');

cardsRouter.get('/',
  celebrate({
    headers: Joi.object({
      'content-type': Joi.string().required(),
    }).unknown(),
  }),
  auth, getAllCards);

cardsRouter.post('/',
  celebrate({
    headers: Joi.object({
      'content-type': Joi.string().required(),
    }).unknown(),
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().uri(),
    }),
  }),
  auth, createCard);

cardsRouter.delete('/:cardId',
  celebrate({
    headers: Joi.object({
      'content-type': Joi.string().required(),
    }).unknown(),
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24).required(),
    }),
  }),
  auth, deleteCard);

cardsRouter.put('/:cardId/likes',
  celebrate({
    headers: Joi.object({
      'content-type': Joi.string().required(),
    }).unknown(),
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24).required(),
    }),
  }),
  auth, likeCard);

cardsRouter.delete('/:cardId/likes',
  celebrate({
    headers: Joi.object({
      'content-type': Joi.string().required(),
    }).unknown(),
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24).required(),
    }),
  }),
  auth, dislikeCard);

module.exports = cardsRouter;
