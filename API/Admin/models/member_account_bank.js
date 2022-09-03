'use strict';
module.exports = (sequelize, DataTypes) => {
  const Member_Account_Bank = sequelize.define('Member_Account_Bank', {
    uuid: DataTypes.STRING,
    bank_name: DataTypes.STRING,
    bank_account_name: DataTypes.STRING,
    bank_number: DataTypes.STRING,
    member_credit: DataTypes.DOUBLE,
    member_uuid: DataTypes.STRING
  }, {
    // tableName: "member_account_banks",
       tableName: "Member_Account_Banks",
  });
  Member_Account_Bank.associate = function(models) {
    // associations can be defined here
  };
  return Member_Account_Bank;
};