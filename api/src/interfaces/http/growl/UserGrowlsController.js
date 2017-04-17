const { Router } = require('express');
const { inject } = require('awilix-express');
const S = require('http-status');

const UserGrowlsController = {
  get router() {
    const router = Router({ mergeParams: true });

    router.post('/',
      inject('createGrowl', 'GrowlSerializer', 'ErrorSerializer', 'JSONAPIDeserializer'),
      this.create
    );

    return router;
  },

  create(req, res, next) {
    const {
      createGrowl,
      GrowlSerializer,
      ErrorSerializer,
      JSONAPIDeserializer
    } = req;

    const {
      SUCCESS, ERROR,
      VALIDATION_ERROR,
      USER_NOT_FOUND
    } = createGrowl.outputs;

    const handleBadRequest = (error) => {
      res
        .status(S.BAD_REQUEST)
        .json(ErrorSerializer.badRequest(error));
    };

    createGrowl
      .on(SUCCESS, (growl) => {
        res
          .status(S.CREATED)
          .json(GrowlSerializer.serialize(growl));
      })
      .on(VALIDATION_ERROR, handleBadRequest)
      .on(USER_NOT_FOUND, handleBadRequest)
      .on(ERROR, next);

    JSONAPIDeserializer
      .deserialize(req.body) // TODO: prevent of breaking when it's `{}`
      .then((growlData) => {
        growlData = Object.assign(growlData, {
          userId: req.params.userId
        });

        createGrowl.execute(growlData);
      });
  }
};

module.exports = UserGrowlsController;
