class MovieNotFound extends Error {
  constructor() {
    super();
    this.message = 'Фильм с указанным _id не найдена';
    this.statusCode = 404;
  }
}

module.exports = MovieNotFound;
