'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ref_deposits = sequelize.define('Ref_deposits', {
    uuid: DataTypes.STRING,
    username: DataTypes.STRING,
    ref: DataTypes.STRING,
    acc_bank_transaction_uuid: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    // tableName: "ref_deposits",
    tableName: "Ref_Deposits",
  });
  Ref_deposits.associate = function(models) {
    // associations can be defined here
  };
  return Ref_deposits;
};