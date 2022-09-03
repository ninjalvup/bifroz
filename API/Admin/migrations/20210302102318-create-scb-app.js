'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Scb_Apps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      api_Refresh: {
        type: Sequelize.STRING
      },
      device_Id: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      status_type: {
        type: Sequelize.INTEGER
      },
      accountFrom: {
        type: Sequelize.STRING
      },
      bank_name_app:{
        type: Sequelize.STRING
      },
      bank_account_name_app:{
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
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
    return queryInterface.dropTable('Scb_Apps');
  }
};