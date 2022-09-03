'use strict';
module.exports = (sequelize, DataTypes) => {
  const Slip = sequelize.define('Slip', {
    uuid: DataTypes.STRING(100),
    image_name: DataTypes.STRING(250),
    transaction_uuid: DataTypes.STRING(100)
  }, {
    tableName:'Slip'
  });
  Slip.associate = function(models) {
    // associations can be defined here
  };
  return Slip;
};