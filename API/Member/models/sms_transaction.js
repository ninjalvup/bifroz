'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sms_Transaction = sequelize.define('Sms_Transaction', {
    uuid: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    bank_date: DataTypes.STRING,
    bank_time: DataTypes.STRING,
    amount: DataTypes.STRING,
    bank_tranfer: DataTypes.STRING,
    sms_content: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    // tableName: "sms_transactions",
       tableName: "Sms_Transactions",
  });
  Sms_Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Sms_Transaction;
};