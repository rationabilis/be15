const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const { errors } = require('celebrate');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
/* const wrongRouter = require('./routes/wrong'); */
const { login, createUser } = require('./controllers/user');
const NotFoundError = require('./errors/not-found-error');


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
});
const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});


app.use(express.static(path.join(__dirname, 'public')));

app.post('/signin', login);
app.post('/signup', createUser);
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

app.use('/*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});
app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });
});

app.listen(PORT);
