'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Main_Banks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      bank_name: {
        type: Sequelize.STRING
      },
      bank_account_name: {
        type: Sequelize.STRING
      },
      bank_number: {
        type: Sequelize.STRING
      },
      ip_address: {
        type: Sequelize.STRING
      },
      bank_status: {
        type: Sequelize.STRING
      },
      bank_type: {
        type: Sequelize.STRING
      },
      bank_sms: {
        type: Sequelize.STRING
      },
      status_system: {
        type: Sequelize.STRING
      },
      type_deposit: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      account_sequence: {
        type: Sequelize.INTEGER
      },
      account_set: {
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.DOUBLE
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
    return queryInterface.dropTable('Main_Banks');
  }
};