class customErrorHandler extends Error {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}

module.exports = customErrorHandler;
