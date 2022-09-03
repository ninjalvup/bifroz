'use strict';
module.exports = (sequelize, DataTypes) => {
  const Affiliate_Wallet = sequelize.define('Affiliate_Wallet', {
    uuid: DataTypes.STRING,
    member_uuid: DataTypes.STRING,
    total_affiliate: DataTypes.DOUBLE
  }, {});
  Affiliate_Wallet.associate = function(models) {
    // associations can be defined here
  };
  return Affiliate_Wallet;
};