const dataFaker = require('src/infra/support/dataFaker');

module.exports = (factory, { User }) => {
  factory.define('user', User, {
    username: dataFaker.string({ pool: 'abcdefghijklmnopqrstuvxzwy0123456789' }),
    email: dataFaker.email(),
    password: dataFaker.string({ length: 5 })
  });
};
