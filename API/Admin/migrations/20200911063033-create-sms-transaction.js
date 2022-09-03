'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sms_Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      bank_date: {
        type: Sequelize.STRING
      },
      bank_time: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      bank_tranfer: {
        type: Sequelize.STRING
      },
      title_tranfer: {
        type: Sequelize.STRING
      },
      sms_content: {
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
    return queryInterface.dropTable('Sms_Transactions');
  }
};