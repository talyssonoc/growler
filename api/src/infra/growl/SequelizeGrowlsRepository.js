const GrowlMapper = require('./SequelizeGrowlMapper');
const ErrorMapper = require('../errors/SequelizeErrorMapper');
const ValidationError = require('src/app/errors/ValidationError');
const NotFoundError = require('src/app/errors/NotFoundError');

class SequelizeGrowlsRepository {
  constructor({ UserModel, GrowlModel }) {
    this.UserModel = UserModel;
    this.GrowlModel = GrowlModel;
  }

  add(growl) {
    const { valid, errors } = growl.validate();

    if(!valid) {
      const error = new ValidationError(errors);

      return Promise.reject(error);
    }

    return this.UserModel
      .findById(growl.userId)
      .then((user) => {
        if(!user) {
          const error = new NotFoundError('User', growl.userId);

          return Promise.reject(error);
        }

        return user.createGrowl(GrowlMapper.toDatabase(growl));
      })
      .then(GrowlMapper.toEntity)
      .catch(ErrorMapper.rethrowAsError);
  }

  count() {
    return this.GrowlModel.count();
  }
}

module.exports = SequelizeGrowlsRepository;
