const JSONAPIError = require('jsonapi-serializer').Error;
const S = require('http-status');

const ErrorSerializer = {
  badRequest(error) {
    return new JSONAPIError({
      status: String(S.BAD_REQUEST),
      meta: {
        details: error.errors,
        cause: error.cause
      }
    });
  }
};

module.exports = ErrorSerializer;
