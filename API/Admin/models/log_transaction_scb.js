'use strict';
module.exports = (sequelize, DataTypes) => {
  const Log_Transaction_Scb = sequelize.define('Log_Transaction_Scb', {
    uuid: DataTypes.STRING,
    accountTo: DataTypes.STRING,
    amount: DataTypes.STRING,
    bank: DataTypes.STRING,
    totalAvailableBalance: DataTypes.STRING,
    accountToName: DataTypes.STRING,
    member_uuid: DataTypes.STRING,
    transaction_uuid: DataTypes.STRING,
    transactionDateTime: DataTypes.STRING,
    remainingBalance: DataTypes.DOUBLE,
    QRstring: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    tableName: "Log_Transaction_Scbs",
  });
  Log_Transaction_Scb.associate = function(models) {
    // associations can be defined here
  };
  return Log_Transaction_Scb;
};