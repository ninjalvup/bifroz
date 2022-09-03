'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Promotion_Conditions', {
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
      min_deposit: {
        type: Sequelize.DOUBLE
      },
      max_deposit: {
        type: Sequelize.DOUBLE
      },
      max_bonus: {
        type: Sequelize.DOUBLE
      },
      promotion_uuid: {
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
    return queryInterface.dropTable('Promotion_Conditions');
  }
};