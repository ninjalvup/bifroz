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
        type: Sequelize.STRING,
        primaryKey: true,
      },
      bank: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.DOUBLE
      },
      bonus_credit: {
        type: Sequelize.DOUBLE
      },
      transaction_type: {
        type: Sequelize.STRING
      },
      credit_before: {
        type: Sequelize.DOUBLE
      },
      credit_after: {
        type: Sequelize.DOUBLE
      },
      credit_bank_before: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      credit_bank_after: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bank_time: {
        type: Sequelize.STRING
      },
      create_by: {
        type: Sequelize.STRING
      },
      annotation: {
        type: Sequelize.STRING
      },
      ref: {
        type: Sequelize.STRING
      },
      transaction_status: {
        type: Sequelize.STRING
      },
      auto_status: {
        type: Sequelize.STRING
      },
      transaction_type: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      transaction_slip: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      promotion_uuid: {
        type: Sequelize.STRING
      },
      sms_transaction_uuid: {
        type: Sequelize.STRING,
        allowNull: true,
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
    return queryInterface.dropTable('Member_Account_Bank_Transactions');
  }
};