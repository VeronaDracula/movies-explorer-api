const validator = require('validator');

const validatorURL = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('Некоректный URL');
};

module.exports = validatorURL;
