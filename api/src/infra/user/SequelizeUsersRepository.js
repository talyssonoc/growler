const UserMapper = require('./SequelizeUserMapper');
const ErrorMapper = require('../errors/SequelizeErrorMapper');

class SequelizeUsersRepository {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  add(user) {
    const { valid, errors } = user.validate();

    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      return Promise.reject(error);
    }

    return this.UserModel
      .create(UserMapper.toDatabase(user))
      .then(UserMapper.toEntity)
      .catch(ErrorMapper.rethrowAsError);
  }
}

module.exports = SequelizeUsersRepository;
