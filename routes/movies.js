const router = require('express').Router();
const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { MovieDataValidate, movieIdValidate } = require('../middlewares/validators/movieValidators');

// GET /movies — возвращает все карточки
router.get('/', getAllMovies);

// POST /cards — создаёт карточку
router.post('/', MovieDataValidate, createMovie);

// DELETE /cards/:cardId — удаляет карточку по идентификатору
router.delete('/:movieId', movieIdValidate, deleteMovie);

module.exports = router;
