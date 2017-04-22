const { expect } = require('chai');
const factory = require('test/support/factory');
const SequelizeUsersRepository = require('src/infra/user/SequelizeUsersRepository');
const User = require('src/domain/user/User');
const { User: UserModel } = require('src/infra/database/models');

describe('Infra :: User :: SequelizeUsersRepository', () => {
  let repo;

  beforeEach(() => {
    repo = new SequelizeUsersRepository({ UserModel });
  });

  describe('#add', () => {
    context('when user is valid', () => {
      it('persists the user', () => {
        const user = new User({
          username: 'theuser',
          email: 'user@email.com',
          password: 'somepassword'
        });

        expect(user.validate().valid).to.be.ok();

        return expect(() => {
          return repo.add(user)
            .then((persistedUser) => {
              expect(persistedUser.id).to.exist;
              expect(persistedUser.username).to.equal('theuser');
              expect(persistedUser.email).to.equal('user@email.com');
              expect(persistedUser.password).to.equal('somepassword');
            });
        }).to.alter(() => repo.count(), { by: 1 });
      });
    });

    context('when user fails a database constraint', () => {
      beforeEach(() => {
        return factory.create('user', {
          email: 'notunique@email.com'
        });
      });

      it('fails and does not persist', () => {
        const user = new User({
          username: 'theuser',
          email: 'notunique@email.com',
          password: 'somepassword'
        });

        return expect(() => {
          return repo.add(user)
            .catch((error) => {
              expect(error.cause.name).to.equal('SequelizeUniqueConstraintError');
              expect(error.cause.fields).to.eql({ email: 'notunique@email.com' });
            });
        }).to.not.alter(() => repo.count());
      });
    });

    context('when user is invalid', () => {
      it('fails and does not persist', () => {
        const user = new User({
          username: 'theuser',
          email: 'invalidemail',
          password: 'somepassword'
        });

        return expect(() => {
          return repo.add(user)
            .catch((error) => {
              expect(error.name).to.equal('ValidationError');
              expect(error.errors[0].path).to.equal('email');
            });
        }).to.not.alter(() => repo.count());
      });
    });
  });
});
