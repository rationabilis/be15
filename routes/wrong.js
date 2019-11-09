const wrongRouter = require('express').Router();
const NotFoundError = require('../errors/not-found-error');

wrongRouter.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = wrongRouter;
