const { pick } = require('ramda');
const Growl = require('src/domain/growl/Growl');

const DB_ATTRS = ['id', 'text', 'userId', 'user'];
const ENTITY_ATTRS = ['text', 'userId', 'user'];

const SequelizeGrowlMapper = {
  toEntity({ dataValues }) {
    const growlData = pick(DB_ATTRS, dataValues);

    // TODO: improve this
    if(growlData.userId && !growlData.user) {
      growlData.user = {
        id: growlData.userId
      };

      growlData.userId = undefined;
    }

    return new Growl(growlData);
  },

  toDatabase(growl) {
    return pick(ENTITY_ATTRS, growl);
  }
};

module.exports = SequelizeGrowlMapper;
