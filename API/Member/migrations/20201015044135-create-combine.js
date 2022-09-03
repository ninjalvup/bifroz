'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Combines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      web_on_off: {
        type: Sequelize.INTEGER
      },
      message_on_of_web: {
        type: Sequelize.STRING
      },
      message_member: {
        type: Sequelize.STRING
      },
      status_outstanding: {
        type: Sequelize.INTEGER
      },
      credit_min: {
        type: Sequelize.INTEGER
      },
      credit_max: {
        type: Sequelize.INTEGER
      },
      status_auto: {
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.INTEGER
      },
      status_amount: {
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
    return queryInterface.dropTable('Combines');
  }
};