'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Promotions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      promotion_name: {
        type: Sequelize.STRING
      },
      promotion_image: {
        type: Sequelize.STRING
      },
      bonus_type_id: {
        type: Sequelize.INTEGER
      },
      promotion_type_id: {
        type: Sequelize.INTEGER
      },
      min_deposit: {
        type: Sequelize.DOUBLE
      },
      max_deposit: {
        type: Sequelize.DOUBLE
      },
      max_bonus: {
        type: Sequelize.DOUBLE
      },
      turn_over_slot: {
        type: Sequelize.DOUBLE
      },
      max_withdraw: {
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
      status: {
        type: Sequelize.STRING
      },
      turnnotpro: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Promotions');
  }
};