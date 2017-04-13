const ValidationError = require('src/app/errors/ValidationError');

const SequelizeErrorMapper = {
  rethrowAsError(error) {
    const convertedError = SequelizeErrorMapper.convert(error);

    throw convertedError;
  },

  convert(error) {
    switch(error.message) {
    case 'Validation error':
      return convertValidationError(error);
    }
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
