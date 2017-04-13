class ValidationError extends Error {
  constructor(errors) {
    super(ValidationError.MESSAGE);
    this.name = ValidationError.MESSAGE;
    this.errors = errors;
  }
}

ValidationError.MESSAGE = 'ValidationError';

module.exports = ValidationError;
