'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Log_Transaction_Scbs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      accountTo: {
        type: Sequelize.STRING
      },
      accountToName: {
        type: Sequelize.STRING
      },
      totalAvailableBalance: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      bank: {
        type: Sequelize.STRING
      },
      member_uuid: {
        type: Sequelize.STRING
      },
      transaction_uuid: {
        type: Sequelize.STRING
      },
      transactionDateTime: {
        type: Sequelize.STRING
      },
      remainingBalance: {
        type: Sequelize.DOUBLE
      },
      QRstring: {
        type: Sequelize.STRING
      },
      status: {
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
    return queryInterface.dropTable('Log_Transaction_Scbs');
  }
};