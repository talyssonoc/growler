const { expect } = require('chai');
const ErrorSerializer = require('src/interfaces/http/errors/ErrorSerializer');

describe('HTTP :: Errors :: ErrorSerializer', () => {
  describe('.validationError', () => {
    it('creates an error for each validation error with status 400', () => {
      const validationError = {
        errors: [
          { message: 'This is invalid' },
          { message: 'This is invalid too' }
        ]
      };

      const serialized = ErrorSerializer.validationError(validationError);

      expect(serialized).to.eql({
        errors: [
          {
            status: '400', title: 'This is invalid', meta: { message: 'This is invalid' }
          },
          {
            status: '400', title: 'This is invalid too', meta: { message: 'This is invalid too' }
          }
        ]
      });
    });
  });

  describe('.notFound', () => {
    it('serialize the message with status 404', () => {
      const notFoundError = {
        message: 'I could not find it'
      };

      const serialized = ErrorSerializer.notFound(notFoundError);

      expect(serialized).to.eql({
        errors: [
          {
            status: '404',
            title: 'I could not find it'
          }
        ]
      });
    });
  });
});
