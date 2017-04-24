const JSONAPIError = require('jsonapi-serializer').Error;
const S = require('http-status');

const ErrorSerializer = {
  validationError(error) {
    const errors = error.errors.map((err) => ({
      status: String(S.BAD_REQUEST),
      title: err.message,
      meta: err
    }));

    return new JSONAPIError(errors);
  },
  notFound(error) {
    return new JSONAPIError({
      status: String(S.NOT_FOUND),
      title: error.message
    });
  }
};

module.exports = ErrorSerializer;
