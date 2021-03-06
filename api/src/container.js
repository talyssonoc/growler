const { createContainer, Lifetime } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const config = require('../config');
const Application = require('./app/Application');
const CreateUser = require('./app/user/CreateUser');

const Server = require('./interfaces/http/Server');
const router = require('./interfaces/http/router');
const loggerMiddleware = require('./interfaces/http/logging/loggerMiddleware');
const errorHandler = require('./interfaces/http/errors/errorHandler');
const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');
const JSONAPIDeserializer = require('./interfaces/http/JSONAPIDeserializer');
const ErrorSerializer = require('./interfaces/http/errors/ErrorSerializer');
const UserSerializer = require('./interfaces/http/user/UserSerializer');

const logger = require('./infra/logging/logger');
const SequelizeUsersRepository = require('./infra/user/SequelizeUsersRepository');
const { database, User: UserModel } = require('./infra/database/models');

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
    UserSerializer
  });

// Repositories
container.registerClass({
  usersRepository: [SequelizeUsersRepository, { lifetime: Lifetime.SINGLETON }]
});

// Database
container.registerValue({
  database,
  UserModel
});

// Operations
container.registerClass({
  createUser: CreateUser
});

module.exports = container;
