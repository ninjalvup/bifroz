'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction_SCB = sequelize.define('Transaction_SCB', {
    uuid: DataTypes.STRING,
    txnDateTime: DataTypes.STRING,
    txnAmount: DataTypes.DOUBLE,
    txnCurrency: DataTypes.STRING,
    txnDebitCreditFlag: DataTypes.STRING,
    txnRemark: DataTypes.STRING,
    code: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    tableName:'Transaction_SCBs'
  });
  Transaction_SCB.associate = function(models) {
    // associations can be defined here
  };
  return Transaction_SCB;
};