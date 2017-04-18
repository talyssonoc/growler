const Operation = require('src/app/Operation');
const ValidationError = require('src/app/errors/ValidationError');
const NotFoundError = require('src/app/errors/NotFoundError');
const Growl = require('src/domain/growl/Growl');

class CreateGrowl extends Operation {
  constructor({ growlsRepository }) {
    super();
    this.growlsRepository = growlsRepository;
  }

  execute(growlData) {
    const {
      SUCCESS, ERROR,
      VALIDATION_ERROR,
      USER_NOT_FOUND
    } = this.outputs;

    const growl = new Growl(growlData);

    this.growlsRepository
      .add(growl)
      .then((newGrowl) => {
        this.emit(SUCCESS, newGrowl);
      })
      .catch((error) => {
        switch(error.name) {
        case ValidationError.NAME:
          return this.emit(VALIDATION_ERROR, error);
        case NotFoundError.NAME:
          return this.emit(USER_NOT_FOUND, error);
        }

        this.emit(ERROR, error);
      });
  }
}

CreateGrowl.setOutputs(['SUCCESS', 'VALIDATION_ERROR', 'USER_NOT_FOUND', 'ERROR']);

module.exports = CreateGrowl;
