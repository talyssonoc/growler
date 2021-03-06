const { pick } = require('ramda');
const User = require('src/domain/user/User');

const DB_ATTRS = ['id', 'username', 'email', 'password'];
const ENTITY_ATTRS = ['username', 'email', 'password'];

const SequelizeUserMapper = {
  toEntity({ dataValues }) {
    const userData = pick(DB_ATTRS, dataValues);

    return new User(userData);
  },

  toDatabase(survivor) {
    return pick(ENTITY_ATTRS, survivor);
  }
};

module.exports = SequelizeUserMapper;
