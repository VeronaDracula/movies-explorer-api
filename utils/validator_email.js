const validator = require('validator');

const validatorEmail = (value) => {
  const result = validator.isEmail(value);
  if (result) {
    return value;
  }
  throw new Error('Некоректный email');
};

module.exports = validatorEmail;
