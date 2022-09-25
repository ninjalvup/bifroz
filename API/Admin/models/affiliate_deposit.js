'use strict';
module.exports = (sequelize, DataTypes) => {
  const Affiliate_Deposit = sequelize.define('Affiliate_Deposit', {
    uuid: DataTypes.STRING,
    member_uuid_member: DataTypes.STRING,
    amount: DataTypes.DOUBLE,
    percent_value: DataTypes.DOUBLE,
    status: DataTypes.INTEGER,
    turnover: DataTypes.DOUBLE,
    ref: DataTypes.STRING,
    wallet_uuid: DataTypes.STRING,
    deposite_date: {
      type:  DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: "Affiliate_Deposits",
  });
  Affiliate_Deposit.associate = function(models) {
    // associations can be defined here
  };
  return Affiliate_Deposit;
};