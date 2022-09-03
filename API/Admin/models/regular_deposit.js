'use strict';
module.exports = (sequelize, DataTypes) => {
  const Regular_deposit = sequelize.define('Regular_deposit', {
    uuid: DataTypes.STRING,
    amount: DataTypes.DOUBLE,
    member_uuid: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    tableName: "Regular_deposits",
  });
  Regular_deposit.associate = function(models) {
    // associations can be defined here
    models.Regular_deposit.hasMany(models.Member, {
      as: "member",
      foreignKey: 'uuid', // fk
      sourceKey: 'member_uuid' // pk
    });
  };
  return Regular_deposit;
};