'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Affiliate_Settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      percent_value: {
        type: Sequelize.DOUBLE(14,2)
      },
      amount_withdraw: {
        type: Sequelize.DOUBLE(14,2)
      },
      promotion: {
        type: Sequelize.STRING
      },
      fee_withdraw: {
        type: Sequelize.DOUBLE(14,2)
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
    return queryInterface.dropTable('Affiliate_Settings');
  }
};