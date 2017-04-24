class NotFoundError extends Error {
  constructor(resource, identifier) {
    super(`${resource} ${identifier} is not available`);
    this.name = NotFoundError.NAME;
  }
}

NotFoundError.NAME = 'NotFoundError';

module.exports = NotFoundError;
