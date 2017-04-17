class NotFoundError extends Error {
  constructor(errors = {}) {
    super(NotFoundError.MESSAGE);
    this.name = NotFoundError.MESSAGE;
    this.errors = errors;
  }
}

NotFoundError.MESSAGE = 'NotFoundError';

module.exports = NotFoundError;
