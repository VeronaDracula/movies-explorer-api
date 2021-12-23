class UserNotFound extends Error {
  constructor() {
    super();
    this.message = 'Пользователь с указанным _id не найден';
    this.statusCode = 404;
  }
}

module.exports = UserNotFound;
