'use strict';
module.exports = (sequelize, DataTypes) => {
  const Affiliate_Member = sequelize.define('Affiliate_Member', {
    uuid: DataTypes.STRING,
    member_uuid: DataTypes.STRING,
    member_uuid_member: DataTypes.STRING
  }, {
    tableName: "Affiliate_Members",
  });
  Affiliate_Member.associate = function(models) {
    // associations can be defined here
  };
  return Affiliate_Member;
};