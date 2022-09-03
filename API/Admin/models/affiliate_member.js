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
    models.Affiliate_Member.hasMany(models.Member, {
      as: "user",
      foreignKey: 'uuid', // fk
      sourceKey: 'member_uuid_member' // pk
    });
  };
  return Affiliate_Member;
};