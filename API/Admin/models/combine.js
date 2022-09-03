'use strict';
module.exports = (sequelize, DataTypes) => {
  const Combine = sequelize.define('Combine', {
    uuid: DataTypes.STRING,
    web_on_off: DataTypes.INTEGER,
    message_on_of_web: DataTypes.STRING,
    message_member: DataTypes.STRING,
    status_outstanding: DataTypes.INTEGER,
    credit_min: DataTypes.INTEGER,
    credit_max: DataTypes.INTEGER,
    status_auto: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    status_amount: DataTypes.INTEGER
  }, {});
  Combine.associate = function(models) {
    // associations can be defined here
  };
  return Combine;
};