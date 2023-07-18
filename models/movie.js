const mongoose = require('mongoose');
const { LINK_PATTERN } = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (url) => LINK_PATTERN.test(url),
        message: ({ value }) => `${value} - URL указан не корректно`,
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (url) => LINK_PATTERN.test(url),
        message: ({ value }) => `${value} - URL указан не верно`,
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (url) => LINK_PATTERN.test(url),
        message: ({ value }) => `${value} - URL указан не верно`,
      },
    },
    owner: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    movieId: {
      type: Number,
      required: true,
      unique: false,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { toObject: { useProjection: true }, toJSON: { useProjection: true } },
);

module.exports = mongoose.model('movie', movieSchema);
