class ValidationError extends Error {
  constructor(errors) {
    super(ValidationError.NAME);
    this.name = ValidationError.NAME;
    this.errors = errors;
  }
}

ValidationError.NAME = 'ValidationError';

module.exports = ValidationError;
