const Movie = require('../models/movie');
const MovieNotFound = require('../errors/movie_not_found');
const Forbidden = require('../errors/forbidden');
const IncorrectData = require('../errors/incorrect_data');
const {
  ok,
  created,
} = require('../utils/constants');

// получение всех фильмов
const getMovies = (req, res, next) => {
  Movie.find({}).sort({ $natural: -1 })
    .then((movies) => res.status(ok).send(movies))
    .catch(next);
};

// удаление фильма из сохраненных
const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(new MovieNotFound())
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return new Forbidden();
      }
      return movie.remove()
        .then(() => res
          .status(ok)
          .send(movie));
    })
    .catch(next);
};

// добавление фильма в сохраненные
const createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } = req.body;

  return Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId, owner: req.user._id })
    .then((movie) => res.status(created).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectData());
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};