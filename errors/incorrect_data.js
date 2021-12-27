const { incorrectData } = require('../utils/constants');

class IncorrectData extends Error {
  constructor() {
    super();
    this.message = incorrectData;
    this.statusCode = 400;
  }
}

module.exports = IncorrectData;
