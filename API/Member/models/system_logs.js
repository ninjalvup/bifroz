'use strict';
module.exports = (sequelize, DataTypes) => {
  const system_log = sequelize.define('System_Log_Member', {
    uuid: DataTypes.STRING(100),
    status_user: DataTypes.STRING(50),
    login_stamp:{
      type:  DataTypes.DATE,
      defaultValue: DataTypes.NOW
     },
    member_uuid: DataTypes.STRING(100)
  }, {
  
    tableName:'System_Log_Members'
   
  });
  system_log.associate = function(models) {
    // associations can be defined here
  };
  return system_log;
};