const ValidationError = require('src/app/errors/ValidationError');
const NotFoundError = require('src/app/errors/NotFoundError');

const SequelizeErrorMapper = {
  rethrowAsError(error) {
    const convertedError = SequelizeErrorMapper.convert(error);

    throw convertedError;
  },

  convert(error) {
    if(error.message === 'Validation error') {
      return convertValidationError(error);
    }

    return error;
  }
};

const convertValidationError = (original) => {
  const errorDetails = original.errors.map(mapValidationDetails);
  const validationError = new ValidationError(errorDetails);
  validationError.cause = original;

  return validationError;
};

const mapValidationDetails = ({ message, path }) => ({ message, path });

module.exports = SequelizeErrorMapper;
