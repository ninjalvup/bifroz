'use strict';
module.exports = (sequelize, DataTypes) => {
  const Error_List_TurnOver = sequelize.define('Error_List_TurnOver', {
    uuid: DataTypes.STRING,
    turn_over_slot: DataTypes.DOUBLE,
    turn_over_hdp: DataTypes.DOUBLE,
    turn_over_mix_replay: DataTypes.DOUBLE,
    turn_over_mix_step: DataTypes.DOUBLE,
    turn_over_bacara: DataTypes.DOUBLE,
    turn_over_thai_lotterry: DataTypes.DOUBLE,
    turn_over_thai_m2: DataTypes.DOUBLE,
    turn_over_thai_multiplayer: DataTypes.DOUBLE,
    max_withdraw: DataTypes.DOUBLE,
    turn_win: DataTypes.DOUBLE,
    turn_over: DataTypes.DOUBLE,
    turn_type: DataTypes.INTEGER,
    ref_deposit_uuid: DataTypes.STRING
  }, {
     // tableName: "error_list_turnovers",
     tableName: "Error_List_TurnOvers",
  });
  Error_List_TurnOver.associate = function(models) {
    // associations can be defined here
  };
  return Error_List_TurnOver;
};