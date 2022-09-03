'use strict';
module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
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
    register_date:{
      type:  DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    new_member: DataTypes.STRING
  }, {
    // tableName: "members",
    tableName: "Members",
  });
  Member.associate = function(models) {
    // associations can be defined here
    models.Member.hasMany(models.Member_Account_Bank, {
      as: "member_account_banks",
      foreignKey: 'member_uuid', // fk,s promotion_condition
      sourceKey: 'uuid' // pk
    });

    models.Member.hasMany(models.Affiliate_Member, {
      as: "affiliate_member",
      foreignKey: 'member_uuid_member', // fk,s promotion_condition
      sourceKey: 'uuid' // pk
    });
  };
  return Member;
};