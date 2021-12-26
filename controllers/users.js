const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { secretKey } = require('../utils/config');
const NotFound = require('../errors/not_found');
const ConflictError = require('../errors/not_new_email');
const Unauthorized = require('../errors/unauthorized');
const IncorrectData = require('../errors/incorrect_data');
const {
  ok,
  created,
  userNotFound,
  existingEmail,
  incorrectEmailPassword,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

// логин
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : secretKey, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      next(new Unauthorized(incorrectEmailPassword));
    });
};

// возвращает информацию о текущем пользователе
const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(ok).send(user))
    .catch(next);
};

// создание пользователя
const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    })
      .then((user) => res.status(created).send(user))
      .catch((err) => {
        if (err.name === 'MongoServerError' && err.code === 11000) {
          next(new ConflictError(existingEmail));
        }
        if (err.name === 'ValidationError') {
          next(new IncorrectData());
        } else {
          next(err);
        }
      }));
};

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
      throw new NotFound(userNotFound);
    })
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new ConflictError(existingEmail));
      }
      if (err.name === 'ValidationError') {
        next(new IncorrectData());
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  updateUser,
  login,
  getUser,
};
