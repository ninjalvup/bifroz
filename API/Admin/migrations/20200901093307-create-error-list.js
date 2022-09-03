'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Error_Lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.DOUBLE
      },
      bonus_credit: {
        type: Sequelize.DOUBLE
      },
      credit_before: {
        type: Sequelize.DOUBLE
      },
      credit_after: {
        type: Sequelize.DOUBLE
      },
      date: {
        type: Sequelize.DATE
      },
      annotation: {
        type: Sequelize.STRING
      },
      create_by: {
        type: Sequelize.STRING
      },
      error_list_name: {
        type: Sequelize.STRING
      },
      ref: {
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
    return queryInterface.dropTable('Error_Lists');
  }
};