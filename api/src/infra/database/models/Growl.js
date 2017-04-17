'use strict';
module.exports = function(sequelize, DataTypes) {
  var Growl = sequelize.define('growl', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1, 140]
    }
  }, {
    classMethods: {
      associate: function({ User }) {
        this.belongsTo(User);
      }
    }
  });

  return Growl;
};
