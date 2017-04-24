const { expect } = require('chai');
const CreateGrowl = require('src/app/growl/CreateGrowl');

describe('App :: Growl :: CreateGrowl', () => {
  let createGrowl;

  context('when growl is valid to be persisted', () => {
    before(() => {
      const MockGrowlsRepository = {
        add: (growl) => Promise.resolve(growl)
      };

      createGrowl = new CreateGrowl({
        growlsRepository: MockGrowlsRepository
      });
    });

    it('creates the growl and emits SUCCESS', (done) => {
      const growlData = { text: 'This is the text' };

      createGrowl.on(createGrowl.outputs.SUCCESS, (response) => {
        expect(response.text).to.equal('This is the text');
        done();
      });

      createGrowl.execute(growlData);
    });
  });

  context('when growl is invalid to be persisted', () => {
    before(() => {
      const MockGrowlsRepository = {
        add: () => Promise.reject({ name: 'ValidationError' })
      };

      createGrowl = new CreateGrowl({
        growlsRepository: MockGrowlsRepository
      });
    });

    it('emits VALIDATION_ERROR with the error', (done) => {
      const growlData = { text: 'The text' };

      createGrowl.on(createGrowl.outputs.VALIDATION_ERROR, (response) => {
        expect(response).to.eql({ name: 'ValidationError' });
        done();
      });

      createGrowl.execute(growlData);
    });
  });

  context('when the user owner of the growl does not exist', () => {
    before(() => {
      const MockGrowlsRepository = {
        add: () => Promise.reject({ name: 'NotFoundError' })
      };

      createGrowl = new CreateGrowl({
        growlsRepository: MockGrowlsRepository
      });
    });

    it('emits USER_NOT_FOUND with the error', (done) => {
      const growlData = { text: 'The text' };

      createGrowl.on(createGrowl.outputs.USER_NOT_FOUND, (response) => {
        expect(response).to.eql({ name: 'NotFoundError' });
        done();
      });

      createGrowl.execute(growlData);
    });
  });

  context('when there is an internal error during persistence', () => {
    before(() => {
      const MockGrowlsRepository = {
        add: () => Promise.reject(new Error('Some Error'))
      };

      createGrowl = new CreateGrowl({
        growlsRepository: MockGrowlsRepository
      });
    });

    it('emits ERROR with the error', (done) => {
      const growlData = { text: 'The text' };

      createGrowl.on(createGrowl.outputs.ERROR, (response) => {
        expect(response.message).to.equal('Some Error');
        done();
      });

      createGrowl.execute(growlData);
    });
  });
});
