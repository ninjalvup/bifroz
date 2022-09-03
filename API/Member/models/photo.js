'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    photo: DataTypes.STRING
  }, {
    tableName:'Photo'
  });
  Photo.associate = function(models) {
    // associations can be defined here
  };
  return Photo;
};