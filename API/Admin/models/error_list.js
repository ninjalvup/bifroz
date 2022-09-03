'use strict';
module.exports = (sequelize, DataTypes) => {
  const Error_List = sequelize.define('Error_List', {
    uuid: DataTypes.STRING,
    username: DataTypes.STRING,
    amount: DataTypes.DOUBLE,
    bonus_credit: DataTypes.DOUBLE,
    credit_before: DataTypes.DOUBLE,
    credit_after: DataTypes.DOUBLE,
    date: DataTypes.STRING,
    annotation: DataTypes.STRING,
    create_by: DataTypes.STRING,
    error_list_name: DataTypes.STRING,
    ref: DataTypes.STRING,
  }, {
    // tableName: "error_lists",
    tableName: "Error_Lists",
  });
  Error_List.associate = function(models) {
    // associations can be defined here
  };
  return Error_List;
};
