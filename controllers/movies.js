const {
  ValidationError,
  DocumentNotFoundError,
  CastError,
} = require('mongoose').Error;
const ForbiddenError = require('../utils/errors/ForbiddenError');
const NotFoundError = require('../utils/errors/NotFoundError');
const IncorrectDataError = require('../utils/errors/IncorrectDataError');

const Movie = require('../models/movie');
const { CREATED_CODE } = require('../utils/constants');

// GET /movies — возвращает все карточки
module.exports.getAllMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .populate([{ model: 'user', path: 'owner' }])
    .then((cards) => res.send(cards))
    .catch(next);
};

// POST /movies — создаёт карточку
module.exports.createMovie = (req, res, next) => {
  const id = req.user._id;
  const {
    movieId,
    country,
    director,
    duration,
    year,
    description,
    nameRU,
    nameEN,
    image,
    trailerLink,
    thumbnail,
  } = req.body;
  Movie.create({
    owner: id,
    movieId,
    country,
    director,
    duration,
    year,
    description,
    nameRU,
    nameEN,
    image,
    trailerLink,
    thumbnail,

  })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(CREATED_CODE).send(movie))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new IncorrectDataError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

// DELETE /movies/:movieId — удаляет карточку по идентификатору
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .populate([{ path: 'owner', model: 'user' }])
    .orFail()
    .then((movie) => {
      const owner = movie.owner._id.toString();
      if (req.user._id === owner) {
        movie.deleteOne()
          .then((deletedCard) => res.send(deletedCard))
          .catch(next);
      } else {
        next(new ForbiddenError('Нельзя удалять чужие карточки.'));
      }
    })
    // .catch(next);
    // })
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError(`В базе данных не найдена карточка с ID: ${req.params.movieId}.`));
      } else if (err instanceof CastError) {
        next(new IncorrectDataError(`Передан некорректный ID карточки: ${req.params.movieId}.`));
      } else {
        next(err);
      }
    });
};
