class ExistingEmail extends Error {
  constructor() {
    super();
    this.message = 'Пользователь с указанным email уже существует';
    this.statusCode = 409;
  }
}

module.exports = ExistingEmail;
