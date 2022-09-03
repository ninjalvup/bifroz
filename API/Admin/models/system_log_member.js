'use strict';
module.exports = (sequelize, DataTypes) => {
  const System_Log_Member = sequelize.define('System_Log_Member', {
    uuid: DataTypes.STRING,
    status_user: DataTypes.STRING,
    login_stamp: DataTypes.DATE,
    member_uuid: DataTypes.STRING
  }, {
    // tableName: "system_log_members",
    tableName: "System_Log_Members",
  });
  System_Log_Member.associate = function(models) {
    // associations can be defined here
  };
  return System_Log_Member;
};