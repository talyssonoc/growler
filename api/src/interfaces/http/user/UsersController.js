const { Router } = require('express');
const { inject } = require('awilix-express');
const S = require('http-status');

const UsersController = {
  get router() {
    const router = Router();

    router.post('/',
      inject('createUser', 'UserSerializer', 'ErrorSerializer', 'JSONAPIDeserializer'),
      this.create
    );

    return router;
  },

  create(req, res, next) {
    const {
      createUser,
      UserSerializer,
      ErrorSerializer,
      JSONAPIDeserializer
    } = req;

    const { SUCCESS, ERROR, VALIDATION_ERROR } = createUser.outputs;

    createUser
      .on(SUCCESS, (user) => {
        res
          .status(S.CREATED)
          .json(UserSerializer.serialize(user));
      })
      .on(VALIDATION_ERROR, (error) => {
        res
          .status(S.BAD_REQUEST)
          .json(ErrorSerializer.validationError(error));
      })
      .on(ERROR, next);

    JSONAPIDeserializer
      .deserialize(req.body)
      .then((userData) => createUser.execute(userData));
  }
};

module.exports = UsersController;
