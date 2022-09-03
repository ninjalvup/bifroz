'use strict';
module.exports = (sequelize, DataTypes) => {
  const Error_List_Type = sequelize.define('Error_List_Type', {
    uuid: DataTypes.STRING,
    error_list_name: DataTypes.STRING
  }, {
    // tableName: "error_list_types",
    tableName: "Error_List_Types",
  });
  Error_List_Type.associate = function(models) {
    // associations can be defined here
  };
  return Error_List_Type;
};