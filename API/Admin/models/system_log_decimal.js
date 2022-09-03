'use strict';
module.exports = (sequelize, DataTypes) => {
  const System_log_decimal = sequelize.define('System_log_decimal', {
    uuid: DataTypes.STRING,
    member_uuid: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    decimal_stamp: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    tableName:'System_log_decimals'
  });
  System_log_decimal.associate = function(models) {
    // associations can be defined here

    models.System_log_decimal.hasMany(models.Member, {
      as: "members",
      foreignKey: 'uuid', // fk
      sourceKey: 'member_uuid' // pk
    });
  };
  return System_log_decimal;
};