'use strict';

module.exports = (sequelize, DataTypes) => {
  const Member_Account_Bank_Transaction = sequelize.define('Member_account_bank_transaction', {
    uuid: DataTypes.STRING,
    bank: DataTypes.STRING,
    amount: DataTypes.DOUBLE,
    bonus_credit: DataTypes.DOUBLE,
    transaction_type: DataTypes.STRING,
    credit_before: DataTypes.DOUBLE,
    credit_after: DataTypes.DOUBLE,
    credit_bank_before: DataTypes.STRING,
    credit_bank_after: DataTypes.STRING,
    bank_time: DataTypes.STRING,
    create_by: DataTypes.STRING,
    annotation: DataTypes.STRING,
    ref: DataTypes.STRING,
    transaction_status: DataTypes.STRING,
    auto_status: DataTypes.STRING,
    transaction_slip: DataTypes.STRING,
    username: DataTypes.STRING,
    promotion_uuid: DataTypes.STRING,
    sms_transaction_uuid: DataTypes.STRING
  }, {
    // tableName: "member_account_bank_transactions",
    tableName: "Member_Account_Bank_Transactions",
  });
  Member_Account_Bank_Transaction.associate = function(models) {
    // associations can be defined here,

  };
  return Member_Account_Bank_Transaction;
};