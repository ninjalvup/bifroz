'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transactions_Curl = sequelize.define('Transactions_Curl', {
    title: DataTypes.STRING,
    date: DataTypes.STRING,
    time: DataTypes.STRING,
    amount: DataTypes.STRING,
    transfer_from_bank: DataTypes.STRING,
    bank_account_number: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    accountnumber: DataTypes.STRING,
    amounttotal: DataTypes.STRING,
    amountbalance: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    tableName:'Transactions_Curls'
  });
  Transactions_Curl.associate = function(models) {
    // associations can be defined here
  };
  return Transactions_Curl;
};