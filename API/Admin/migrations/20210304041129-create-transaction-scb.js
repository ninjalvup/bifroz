'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transaction_SCBs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      txnDateTime: {
        type: Sequelize.STRING
      },
      txnAmount: {
        type: Sequelize.DOUBLE
      },
      txnCurrency: {
        type: Sequelize.STRING
      },
      txnDebitCreditFlag: {
        type: Sequelize.STRING
      },
      txnRemark: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      description: {
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
    return queryInterface.dropTable('Transaction_SCBs');
  }
};