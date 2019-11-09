const Card = require('../models/card');
const UnauthorizedError = require('../errors/unauthorized-error');

/* Вернуть все карточки */
const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

/* Создать карточку */
const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })

    .then((card) => res.send({ data: card }))
    .catch(next);
};

/* Удалить карточку */
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      const cardData = { data: card };
      if (cardData.data.owner !== req.user._id) { throw new UnauthorizedError('Нет полномочий для удаления карточки'); } else {
        Card.findByIdAndRemove(req.params.cardId)
          .then(() => res.send(cardData));
      }
    })
    .catch(next);
};

/* Поставить лайк */
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(next);
};

/* Убрать лайк */
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports = {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
};
