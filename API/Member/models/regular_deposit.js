


'use strict';
module.exports = (sequelize, DataTypes) => {
  const Regular_deposit = sequelize.define('Regular_deposit', {
    uuid: DataTypes.STRING,
    uuid: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    member_uuid: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    // tableName: "Regular_deposit",
       tableName: "Regular_deposits",
  });
  Regular_deposit.associate = function(models) {
    // associations can be defined here
  };
  return Regular_deposit
  ;
};