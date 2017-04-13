const UserMapper = require('./SequelizeUserMapper');
const ErrorMapper = require('../errors/SequelizeErrorMapper');
const ValidationError = require('src/app/errors/ValidationError');

class SequelizeUsersRepository {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  add(user) {
    const { valid, errors } = user.validate();

    if(!valid) {
      const error = new ValidationError(errors);

      return Promise.reject(error);
    }

    return this.UserModel
      .create(UserMapper.toDatabase(user))
      .then(UserMapper.toEntity)
      .catch(ErrorMapper.rethrowAsError);
  }

  count() {
    return this.UserModel.count();
  }
}

module.exports = SequelizeUsersRepository;
