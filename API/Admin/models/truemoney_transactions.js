'use strict';
module.exports = (sequelize, DataTypes) => {
  const Truemoney_Transactions = sequelize.define('Truemoney_Transactions', {
    uuid: DataTypes.STRING,
    name: DataTypes.STRING,
    pkg: DataTypes.STRING,
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    amount: DataTypes.DOUBLE,
    balance: DataTypes.DOUBLE,
    member_uuid: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    tableName:'Truemoney_Transactions'
  });
  Truemoney_Transactions.associate = function(models) {
    // associations can be defined here
  };
  return Truemoney_Transactions;
};