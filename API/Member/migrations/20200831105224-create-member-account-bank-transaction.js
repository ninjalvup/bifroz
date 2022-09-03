'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Member_Account_Bank_Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      bank: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.DECIMAL
      },
      bonus_credit: {
        type: Sequelize.DECIMAL
      },
      transaction_type: {
        type: Sequelize.STRING
      },
      credit_before: {
        type: Sequelize.DECIMAL
      },
      credit_after: {
        type: Sequelize.DECIMAL
      },
      bank_time: {
        type: Sequelize.STRING
      },
      createby: {
        type: Sequelize.STRING
      },
      annotation: {
        type: Sequelize.STRING
      },
      member_account_bank_uuid: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      ref: {
        type: Sequelize.STRING
      },
      transaction_status: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      promotion_uuid: {
        type: Sequelize.STRING
      },
      
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Member_Account_Bank_Transactions');
  }
};