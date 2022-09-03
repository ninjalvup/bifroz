'use strict';
module.exports = (sequelize, DataTypes) => {
  const Promotion_Condition = sequelize.define('Promotion_Condition', {
    uuid: DataTypes.STRING,
    min_deposit: DataTypes.DOUBLE,
    max_deposit: DataTypes.DOUBLE,
    max_bonus: DataTypes.DOUBLE,
    promotion_uuid: DataTypes.STRING
  }, {
    // tableName: "promotion_conditions",
    tableName: "Promotion_Conditions",
  });
  Promotion_Condition.associate = function(models) {
    // associations can be defined here
  };
  return Promotion_Condition;
};