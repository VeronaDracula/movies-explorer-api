require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const NotFound = require('./errors/not_found');
const { internalServerError, pathNotFound, serverError } = require('./utils/constants');
const { mongoServer } = require('./utils/config');
const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { NODE_ENV, DB_ADDRESS } = process.env;

mongoose.connect(NODE_ENV === 'production' ? DB_ADDRESS : mongoServer, {
  useNewUrlParser: true,
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { PORT = 3000 } = process.env;

app.use(requestLogger);

app.use(cors);

app.use(require('./routes/without_authorization'));

app.use(auth);

app.use(require('./routes/users'));
app.use(require('./routes/movies'));

app.use('*', (req, res, next) => next(new NotFound(pathNotFound)));

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  if (!err.statusCode) {
    res
      .status(internalServerError)
      .send({ message: serverError });
  } else {
    res
      .status(err.statusCode)
      .send({ message: err.message });
  }
  next();
});

app.listen(PORT);
