"use strict";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('../config/index')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
      uuid: DataTypes.STRING(100),
      username: DataTypes.STRING(50),
      password: DataTypes.STRING(100),
      info_name: DataTypes.STRING(50),
      role: DataTypes.STRING(20),
      prefix: DataTypes.STRING(20),
    },
    {
      // tableName: "users",
      tableName: "Users",
    }
  );

  User.associate = (models) => {
    // associations can be defined here
  };

  // เข้ารหัส Password
  User.encryptPassword = async function(password) {
    const salt = await bcrypt.genSalt(5);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
 }

  // เช็ค Password
  User.prototype.checkPassword = async (password, hashPassword) => {
    const isValid = await bcrypt.compare(password, hashPassword);
    return isValid;
  };

  // สร้าง Token
  User.prototype.createToken = async (uuid, role) => {
    const token = await jwt.sign(
      {
        uuid: uuid,
        role: role,
      },
      config.JWT_KEY,
      { expiresIn: config.JWT_EXP }
    );

    return token;
  };
  
  return User;

};
