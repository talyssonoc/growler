const { pick } = require('ramda');
const Growl = require('src/domain/growl/Growl');

const DB_ATTRS = ['id', 'text', 'userId', 'user'];
const ENTITY_ATTRS = ['text', 'userId', 'user'];

const SequelizeGrowlMapper = {
  toEntity({ dataValues }) {
    const growlData = pick(DB_ATTRS, dataValues);

    return new Growl(growlData);
  },

  toDatabase(growl) {
    return pick(ENTITY_ATTRS, growl);
  }
};

module.exports = SequelizeGrowlMapper;
