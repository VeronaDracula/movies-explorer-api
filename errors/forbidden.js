class Forbidden extends Error {
  constructor() {
    super();
    this.message = 'Действие запрещено';
    this.statusCode = 403;
  }
}

module.exports = Forbidden;
