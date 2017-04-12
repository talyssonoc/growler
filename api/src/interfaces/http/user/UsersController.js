const { Router } = require('express');
const { inject } = require('awilix-express');
const S = require('http-status');

const UsersController = {
  get router() {
    const router = Router();

    router.post('/', inject('createUser'), this.create);
  },

  create(req, res, next) {
    const { createUser } = req.createUser;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = createUser;

    createUser
      .on(SUCCESS, (user) => {
        res.status(S.CREATED).json(user);
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(S.BAD_REQUEST).json({
          type: 'ValidationError'
        });
      })
      .on(ERROR, next);

    createUser.execute(req.body);
  }
};

module.exports = UsersController;
