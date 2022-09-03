'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ref_Deposit = sequelize.define('Ref_Deposit', {
    uuid: DataTypes.STRING,
    username: DataTypes.STRING,
    ref: DataTypes.STRING,
    acc_bank_transaction_uuid: DataTypes.STRING,
    status: DataTypes.STRING
  },  {
    // tableName: "ref_deposits",
    tableName: "Ref_Deposits",
  });
  Ref_Deposit.associate = function(models) {
    // associations can be defined here
    models.Ref_Deposit.hasOne(models.Error_List_TurnOver, {
      as: 'error_list_turnover',
      foreignKey: 'ref_deposit_uuid', // fk
      sourceKey: 'uuid' // pk
    });
  };
  return Ref_Deposit;
};