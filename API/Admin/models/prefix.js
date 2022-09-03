'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prefix = sequelize.define('Prefix', {
    uuid: DataTypes.STRING,
    company: DataTypes.STRING,
    product: DataTypes.STRING,
    agent_id: DataTypes.STRING,
    url: DataTypes.STRING,
    line: DataTypes.STRING,
    logo: DataTypes.STRING,
    bg: DataTypes.STRING,
    bandner: DataTypes.STRING,
    token_line: DataTypes.STRING,
    prefix_key: DataTypes.STRING
  }, {});
  Prefix.associate = function(models) {
    // associations can be defined here
  };
  return Prefix;
};