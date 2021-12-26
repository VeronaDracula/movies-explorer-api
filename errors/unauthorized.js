const { unauthorized } = require('../utils/constants');

class Unauthorized extends Error {
  constructor() {
    super();
    this.message = unauthorized;
    this.statusCode = 401;
  }
}

module.exports = Unauthorized;
