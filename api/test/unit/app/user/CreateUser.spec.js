const { expect } = require('chai');
const CreateUser = require('src/app/user/CreateUser');

describe('App :: User :: CreateUser', () => {
  let createUser;

  context('when user is valid to be persisted', () => {
    before(() => {
      const MockUsersRepository = {
        add: (user) => Promise.resolve(user)
      };

      createUser = new CreateUser({
        usersRepository: MockUsersRepository
      });
    });

    it('creates the user and emits SUCCESS', (done) => {
      const userData = { username: 'newuser' };

      createUser.on(createUser.outputs.SUCCESS, (response) => {
        expect(response.username).to.equal('newuser');
        done();
      });

      createUser.execute(userData);
    });
  });

  context('when user is invalid to be persisted', () => {
    before(() => {
      const MockUsersRepository = {
        add: () => Promise.reject({ name: 'ValidationError' })
      };

      createUser = new CreateUser({
        usersRepository: MockUsersRepository
      });
    });

    it('emits VALIDATION_ERROR with the error', (done) => {
      const userData = { username: 'New User' };

      createUser.on(createUser.outputs.VALIDATION_ERROR, (response) => {
        expect(response).to.eql({ name: 'ValidationError' });
        done();
      });

      createUser.execute(userData);
    });
  });

  context('when there is an internal error during persistence', () => {
    before(() => {
      const MockUsersRepository = {
        add: () => Promise.reject(new Error('Some Error'))
      };

      createUser = new CreateUser({
        usersRepository: MockUsersRepository
      });
    });

    it('emits ERROR with the error', (done) => {
      const userData = { username: 'New User' };

      createUser.on(createUser.outputs.ERROR, (response) => {
        expect(response.message).to.equal('Some Error');
        done();
      });

      createUser.execute(userData);
    });
  });
});
