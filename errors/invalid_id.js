class InvalidId extends Error {
  constructor() {
    super();
    this.message = 'Невалидный _id';
    this.statusCode = 401;
  }
}

module.exports = InvalidId;
