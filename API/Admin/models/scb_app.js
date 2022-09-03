'use strict';
module.exports = (sequelize, DataTypes) => {
  const Scb_App = sequelize.define('Scb_App', {
    uuid: DataTypes.STRING,
    api_Refresh: DataTypes.STRING,
    device_Id: DataTypes.STRING,
    status: DataTypes.INTEGER,
    status_type: DataTypes.INTEGER,
    bank_name_app: DataTypes.STRING,
    bank_account_name_app: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    accountFrom: DataTypes.STRING
  }, {
    tableName: "Scb_Apps",
  });
  Scb_App.associate = function(models) {
    // associations can be defined here
  };
  return Scb_App;
};


