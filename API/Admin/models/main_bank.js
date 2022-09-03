'use strict';
module.exports = (sequelize, DataTypes) => {
  const Main_Bank = sequelize.define('Main_Bank', {
    uuid: DataTypes.STRING,
    bank_account_name: DataTypes.STRING,
    bank_name: DataTypes.STRING,
    bank_number: DataTypes.STRING,
    ip_address: DataTypes.STRING,
    bank_status: DataTypes.STRING,
    bank_type: DataTypes.STRING,
    bank_sms: DataTypes.STRING,
    status_system: DataTypes.STRING,
    type_deposit: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    account_sequence: DataTypes.INTEGER,
    account_set: DataTypes.INTEGER,
    amount: DataTypes.DOUBLE
  }, {
    // tableName: "main_banks",
    tableName: "Main_Banks",
  });
  Main_Bank.associate = function(models) {
    // associations can be defined here
  };
  return Main_Bank;
};