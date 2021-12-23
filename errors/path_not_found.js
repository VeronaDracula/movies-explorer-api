class PathNotFound extends Error {
  constructor() {
    super();
    this.message = 'Путь не найден';
    this.statusCode = 404;
  }
}

module.exports = PathNotFound;
