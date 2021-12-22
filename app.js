
const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
//const { celebrate, errors, Joi } = require('celebrate');


mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const { PORT = 3000 } = process.env;

// app.use(requestLogger);
//
// app.use(cors);

// app.use('/', require('./routes/users'));
// app.use('/', require('./routes/movies'));

//app.use('*', (req, res, next) => next(new PathNotFound()));

//app.use(errorLogger);

// app.use(errors());
//
// app.use((err, req, res, next) => {
//   if (!err.statusCode) {
//     res
//       .status(internalServerError)
//       .send({ message: 'На сервере произошла ошибка' });
//   } else {
//     res
//       .status(err.statusCode)
//       .send({ message: err.message });
//   }
//   next();// линтер требует использовать next внутри функции
// });

app.listen(PORT);

