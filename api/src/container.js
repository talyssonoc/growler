const { createContainer, Lifetime } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const config = require('../config');
const Application = require('./app/Application');
const CreateUser = require('./app/user/CreateUser');
const CreateGrowl = require('./app/growl/CreateGrowl');

const Server = require('./interfaces/http/Server');
const router = require('./interfaces/http/router');
const loggerMiddleware = require('./interfaces/http/logging/loggerMiddleware');
const errorHandler = require('./interfaces/http/errors/errorHandler');
const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');
const JSONAPIDeserializer = require('./interfaces/http/JSONAPIDeserializer');
const ErrorSerializer = require('./interfaces/http/errors/ErrorSerializer');
const UserSerializer = require('./interfaces/http/user/UserSerializer');
const GrowlSerializer = require('./interfaces/http/growl/GrowlSerializer');

const logger = require('./infra/logging/logger');
const SequelizeUsersRepository = require('./infra/user/SequelizeUsersRepository');
const SequelizeGrowlsRepository = require('./infra/growl/SequelizeGrowlsRepository');
const {
  database,
  User: UserModel,
  Growl: GrowlModel
} = require('./infra/database/models');

const container = createContainer();

// System
container
  .registerClass({
    app: [Application, { lifetime: Lifetime.SINGLETON }],
    server: [Server, { lifetime: Lifetime.SINGLETON }]
  })
  .registerFunction({
    router: [router, { lifetime: Lifetime.SINGLETON }],
    logger: [logger, { lifetime: Lifetime.SINGLETON }]
  })
  .registerValue({ config });

// Middlewares
container
  .registerFunction({
    loggerMiddleware: [loggerMiddleware, { lifetime: Lifetime.SINGLETON }]
  })
  .registerValue({
    containerMiddleware: scopePerRequest(container),
    errorHandler: config.production ? errorHandler : devErrorHandler
  });

// JSON API
container
  .registerValue({
    JSONAPIDeserializer,
    ErrorSerializer,
    UserSerializer,
    GrowlSerializer
  });

// Repositories
container.registerClass({
  usersRepository: [SequelizeUsersRepository, { lifetime: Lifetime.SINGLETON }],
  growlsRepository: [SequelizeGrowlsRepository, { lifetime: Lifetime.SINGLETON }]
});

// Database
container.registerValue({
  database,
  UserModel,
  GrowlModel
});

// Operations
container.registerClass({
  createUser: CreateUser,
  createGrowl: CreateGrowl
});

module.exports = container;
