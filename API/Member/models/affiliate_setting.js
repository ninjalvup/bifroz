'use strict';
module.exports = (sequelize, DataTypes) => {
  const Affiliate_Setting = sequelize.define('Affiliate_Setting', {
    uuid: DataTypes.STRING,
    percent_value: DataTypes.DOUBLE,
    amount_withdraw: DataTypes.DOUBLE,
    promotion: DataTypes.STRING,
    fee_withdraw: DataTypes.DOUBLE
  }, {});
  Affiliate_Setting.associate = function(models) {
    // associations can be defined here
  };
  return Affiliate_Setting;
};