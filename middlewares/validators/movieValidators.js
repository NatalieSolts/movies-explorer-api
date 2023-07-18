const { Joi, celebrate } = require('celebrate');
const { LINK_PATTERN } = require('../../utils/constants');

module.exports.MovieDataValidate = celebrate({
  body: Joi.object().keys({
    movieId: Joi.number().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    image: Joi.string().required().pattern(LINK_PATTERN),
    trailerLink: Joi.string().required().pattern(LINK_PATTERN),
    thumbnail: Joi.string().required().pattern(LINK_PATTERN),
  }),
});
module.exports.movieIdValidate = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});
