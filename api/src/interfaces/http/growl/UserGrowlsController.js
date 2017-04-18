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

    createGrowl
      .on(SUCCESS, (growl) => {
        res
          .status(S.CREATED)
          .json(GrowlSerializer.serialize(growl));
      })
      .on(VALIDATION_ERROR, (error) => {
        res
          .status(S.BAD_REQUEST)
          .json(ErrorSerializer.validationError(error));
      })
      .on(USER_NOT_FOUND, (error) => {
        res
          .status(S.NOT_FOUND)
          .json(ErrorSerializer.notFound(error));
      })
      .on(ERROR, next);

    JSONAPIDeserializer
      .deserialize(req.body)
      .then((growlData) => {
        growlData = Object.assign(growlData, {
          userId: req.params.userId
        });

        createGrowl.execute(growlData);
      });
  }
};

module.exports = UserGrowlsController;
