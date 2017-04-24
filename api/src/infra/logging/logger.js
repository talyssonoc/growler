const Log4js = require('log4js');

/* istanbul ignore next */
module.exports = ({ config }) => {
  Log4js.configure(config.logging);

  return Log4js.getLogger();
};
