const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validatorEmail = require('../utils/validator_email');
const { incorrectEmailPassword } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: validatorEmail,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(incorrectEmailPassword));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(incorrectEmailPassword));
          }

          return user;
        });
    });
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('user', userSchema);
