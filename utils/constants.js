const ok = 200;
const created = 201;
const internalServerError = 500;

const userNotFound = 'Пользователь с указанным _id не найден';
const movieNotFound = 'Фильм с указанным _id не найдена';
const pathNotFound = 'Путь не найден';
const incorrectEmailPassword = 'Неправильные почта или пароль';
const serverError = 'На сервере произошла ошибка';
const incorrectData = 'Переданы некорректные данные';
const existingEmail = 'Пользователь с указанным email уже существует';
const unauthorized = 'Необходима авторизация';
const forbidden = 'Действие запрещено';

module.exports = {
  ok,
  created,
  internalServerError,
  userNotFound,
  movieNotFound,
  pathNotFound,
  incorrectEmailPassword,
  serverError,
  incorrectData,
  existingEmail,
  unauthorized,
  forbidden,
};
