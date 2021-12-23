class IncorrectEmail extends Error {
  constructor() {
    super();
    this.message = 'Некоректный email';
    this.statusCode = 400;
  }
}

module.exports = IncorrectEmail;
