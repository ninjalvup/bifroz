'use strict';
module.exports = (sequelize, DataTypes) => {
  const Member_account_bank = sequelize.define('Member_account_bank', {
    uuid: DataTypes.STRING,
    bank_name: DataTypes.STRING,
    bank_account_name: DataTypes.STRING,
    bank_number: DataTypes.STRING,
    member_credit: DataTypes.DOUBLE,
    member_uuid: DataTypes.STRING
  }, {
    tableName:'Member_Account_Banks'
  });
  Member_account_bank.associate = function(models) {
    // associations can be defined here
  };
  return Member_account_bank;
};