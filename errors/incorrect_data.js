class IncorrectData extends Error {
  constructor() {
    super();
    this.message = 'Переданы некорректные данные';
    this.statusCode = 400;
  }
}

module.exports = IncorrectData;
