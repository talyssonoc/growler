const { expect } = require('chai');
const factory = require('test/support/factory');
const SequelizeGrowlsRepository = require('src/infra/growl/SequelizeGrowlsRepository');
const Growl = require('src/domain/growl/Growl');
const {
  User: UserModel,
  Growl: GrowlModel
} = require('src/infra/database/models');

describe('Infra :: Growl :: SequelizeGrowlsRepository', () => {
  let repo;

  beforeEach(() => {
    repo = new SequelizeGrowlsRepository({
      UserModel,
      GrowlModel
    });
  });

  describe('#add', () => {
    context('when data is valid', () => {
      context('when user exists', () => {
        let user;

        beforeEach(() => {
          return factory.create('user').then((u) => user = u);
        });

        it('persists the growl and add it to the user', () => {
          const growl = new Growl({
            userId: user.id,
            text: 'This is valid'
          });

          expect(growl.validate().valid).to.be.ok();

          return expect(() => {
            return repo.add(growl)
              .then((persistedGrowl) => {
                expect(persistedGrowl.id).to.exist();
              });
          }).to.alter(() => repo.count(), { by: 1 });
        });
      });

      context('when user does not exist', () => {
        it('does not persist the growl and returns a not found error', () => {
          const growl = new Growl({
            userId: 0,
            text: 'This is valid'
          });

          expect(growl.validate().valid).to.be.ok();

          return expect(() => {
            return repo.add(growl)
              .catch((error) => {
                expect(error.name).to.equal('NotFoundError');
                expect(error.message).to.equal('User 0 is not available');
              });
          }).to.not.alter(() => repo.count());
        });
      });
    });

    context('when growl is invalid', () => {
      it('fails and does not persist', () => {
        const growl = new Growl({
          text: ''
        });

        return expect(() => {
          return repo.add(growl)
            .catch((error) => {
              expect(error.name).to.equal('ValidationError');
              expect(error.errors[0].path).to.equal('text');
            });
        }).to.not.alter(() => repo.count());
      });
    });
  });
});
