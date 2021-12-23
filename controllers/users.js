// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UserNotFound = require('../errors/user_not_found');
//const ExistingEmail = require('../errors/not_new_email');
//const Unauthorized = require('../errors/unauthorized');
const IncorrectData = require('../errors/incorrect_data');
const {
  ok,
  created,
} = require('../utils/constants');

// const { NODE_ENV, JWT_SECRET } = process.env;

// // логин
// const login = (req, res, next) => {
//   const { email, password } = req.body;
//   return User.findUserByCredentials(email, password)
//     .then((user) => {
//       const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
//       res.send({ token });
//     })
//     .catch(() => {
//       next(new Unauthorized());
//     });
// };


// возвращает информацию о текущем пользователе
const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(ok).send(user))
    .catch(next);
};

// // создание пользователя
// const createUser = (req, res, next) => {
//   const {
//     name, about, avatar, email, password,
//   } = req.body;
//
//   bcrypt.hash(password, 10)
//     .then((hash) => User.create({
//       name, about, avatar, email, password: hash,
//     })
//       .then((user) => res.status(created).send(user))
//       .catch((err) => {
//         if (err.name === 'MongoServerError' && err.code === 11000) {
//           next(new ExistingEmail());
//         }
//         if (err.name === 'ValidationError') {
//           next(new IncorrectData());
//         } else {
//           next(err);
//         }
//       }));
// };


// обновление данных пользователя
const updateUser = (req, res, next) => {
  const { name, email } = req.body;

  return User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        return res
          .status(ok)
          .send(user);
      }
      throw new UserNotFound();
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectData());
      } else {
        next(err);
      }
    });
};


module.exports = {
  //createUser,
  updateUser,
  //login,
  getUser,
};