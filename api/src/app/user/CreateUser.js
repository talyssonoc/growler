const Operation = require('src/app/Operation');
const ValidationError = require('src/app/errors/ValidationError');
const User = require('src/domain/user/User');

class CreateUser extends Operation {
  constructor({ usersRepository }) {
    super();
    this.usersRepository = usersRepository;
  }

  execute(userData) {
    const { SUCCESS, VALIDATION_ERROR, ERROR } = this.outputs;

    const user = new User(userData);

    this.usersRepository
      .add(user)
      .then((newUser) => {
        this.emit(SUCCESS, newUser);
      })
      .catch((error) => {
        if(error.message === ValidationError.MESSAGE) {
          return this.emit(VALIDATION_ERROR, error);
        }

        this.emit(ERROR, error);
      });
  }
}

CreateUser.setOutputs(['SUCCESS', 'VALIDATION_ERROR', 'ERROR']);

module.exports = CreateUser;
