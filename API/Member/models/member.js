
const bcryptjs = require('bcryptjs');
'use strict';

module.exports = (sequelize, DataTypes) => {
  const member = sequelize.define('Member', {
    uuid: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: DataTypes.STRING,
    tel: DataTypes.STRING,
    bonus: DataTypes.INTEGER,
    line_id: DataTypes.STRING,
    know_us: DataTypes.STRING,
    sb_password: DataTypes.STRING,
    sb_username: DataTypes.STRING,
    _id: DataTypes.STRING,
    group_id: DataTypes.STRING,
    prefix: DataTypes.STRING,
    new_member: DataTypes.STRING,
    register_date:{
      type:  DataTypes.DATE,
      defaultValue: DataTypes.NOW
     }
  }, {
    tableName:'Members'
  });
  member.associate = function(models) {
    // associations can be defined here
  };

  member.encryptPassword = async function(password) {
    const salt = await bcryptjs.genSalt(5);
    const hashPassword = await bcryptjs.hash(password, salt);
    return hashPassword;
 }
 
 member.checkPassword = async function(password,passwordold) {
    const isValid = await bcryptjs.compare(password, passwordold);
    return isValid;
 }
  return member;
};