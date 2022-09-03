'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Error_List_TurnOvers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      turn_over_slot: {
        type: Sequelize.DOUBLE
      },
      turn_over_hdp: {
        type: Sequelize.DOUBLE
      },
      turn_over_mix_replay: {
        type: Sequelize.DOUBLE
      },
      turn_over_mix_step: {
        type: Sequelize.DOUBLE
      },
      turn_over_bacara: {
        type: Sequelize.DOUBLE
      },
      turn_over_thai_lotterry: {
        type: Sequelize.DOUBLE
      },
      turn_over_thai_m2: {
        type: Sequelize.DOUBLE
      },
      turn_over_thai_multiplayer: {
        type: Sequelize.DOUBLE
      },
      max_withdraw: {
        type: Sequelize.DOUBLE
      },
      turn_win: {
        type: Sequelize.DOUBLE
      },
      turn_over: {
        type: Sequelize.DOUBLE
      },
      turn_type: {
        type: Sequelize.INTEGER
      },
      ref_deposit_uuid: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Error_List_TurnOvers');
  }
};