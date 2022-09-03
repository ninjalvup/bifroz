'use strict';
module.exports = (sequelize, DataTypes) => {
  const System_log_decimal = sequelize.define('System_log_decimal', {
    uuid: DataTypes.STRING,
    member_uuid: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    decimal_stamp:{
      type:  DataTypes.DATE,
      defaultValue: DataTypes.NOW
     },
    status: DataTypes.STRING
  }, {
     tableName:'System_log_decimals'
  });
  System_log_decimal.associate = function(models) {
    // associations can be defined here
  };
  return System_log_decimal;
};