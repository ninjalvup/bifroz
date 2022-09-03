'use strict';
module.exports = (sequelize, DataTypes) => {
  const Promotion = sequelize.define('Promotion', {
    uuid: DataTypes.STRING,
    promotion_name: DataTypes.STRING,
    promotion_image: DataTypes.STRING,
    bonus_type_id: DataTypes.INTEGER,
    promotion_type_id: DataTypes.INTEGER,
    min_deposit: DataTypes.DOUBLE,
    max_deposit: DataTypes.DOUBLE,
    max_bonus: DataTypes.DOUBLE,
    turn_over_slot: DataTypes.DOUBLE,
    max_withdraw: DataTypes.DOUBLE,
    turn_over_hdp: DataTypes.DOUBLE,
    turn_over_mix_replay: DataTypes.DOUBLE,
    turn_over_mix_step: DataTypes.DOUBLE,
    turn_over_bacara: DataTypes.DOUBLE,
    turn_over_thai_lotterry: DataTypes.DOUBLE,
    turn_over_thai_m2: DataTypes.DOUBLE,
    turn_over_thai_multiplayer: DataTypes.DOUBLE,
    status: DataTypes.STRING,
    turnnotpro: DataTypes.INTEGER,
    turn_win: DataTypes.DOUBLE,
    turn_over: DataTypes.DOUBLE,
    turn_type: DataTypes.INTEGER
  }, {
    // tableName: "promotions",
    tableName: "Promotions",
  });
  Promotion.associate = function(models) {
    // associations can be defined here
    models.Promotion.hasMany(models.Promotion_Condition, {
      as: "promotion_conditions",
      foreignKey: 'promotion_uuid', // fk
      sourceKey: 'uuid' // pk
    });

    models.Promotion.hasMany(models.Member_Account_Bank_Transaction, {
      as: "members",
      foreignKey: 'promotion_uuid', // fk
      sourceKey: 'uuid' // pk
    });

  };
  return Promotion;
};