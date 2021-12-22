const mongoose = require('mongoose');
//const validatorURL = require('../utils/validator_url');

const movieSchema = new mongoose.Schema({
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
    //validate: validatorURL,
  },

  trailer: {
    type: String,
    required: true,
    //validate: validatorURL,
  },

  thumbnail: {
    type: String,
    required: true,
    //validate: validatorURL,
  },

  owner: {
    type: [mongoose.ObjectId],
    default: [],
    ref: 'user',
  },

  movieId: {
    type: Number,
    required: true,
  },

  nameRU: {
    type: String,
    required: true,
  },

  nameEN: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('movie', movieSchema);