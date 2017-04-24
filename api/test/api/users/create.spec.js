const { expect } = require('chai');
const request = require('test/support/request');
const factory = require('test/support/factory');

describe('API :: POST /api/users', () => {
  context('when user data is valid', () => {
    let userData;

    beforeEach(() => {
      userData = {
        data: {
          type: 'users',
          attributes: {
            username: 'theuser',
            email: 'me@theuser.com',
            password: 'safepassword'
          }
        }
      };
    });

    it('creates and return the user with status 201', () => {
      return request()
        .post('/api/users')
        .send(userData)
        .expect(201)
        .then(({ body }) => {
          const { attributes } = body.data;

          expect(attributes.id).to.not.be.undefined();
          expect(attributes.username).to.equal('theuser');
          expect(attributes.email).to.equal('me@theuser.com');
        });
    });

    it('does not send user password', () => {
      return request()
        .post('/api/users')
        .send(userData)
        .then(({ body }) => {
          const { attributes } = body.data;

          expect(attributes.password).to.be.undefined();
        });
    });
  });

  context('when email is already registered', () => {
    beforeEach(() => {
      return factory.create('user', {
        email: 'me@theuser.com'
      });
    });

    it('does not create and returns 400', () => {
      const userData = {
        data: {
          type: 'users',
          attributes: {
            username: 'theuser',
            email: 'me@theuser.com',
            password: 'safepassword'
          }
        }
      };

      return request()
        .post('/api/users')
        .send(userData)
        .expect(400)
        .then(({ body }) => {
          const errors = body.errors;

          expect(errors).to.have.lengthOf(1);
          expect(errors[0].title).to.equal('email must be unique');
          expect(errors[0].meta).to.eql({
            message: 'email must be unique',
            path: 'email'
          });
        });
    });
  });
});
