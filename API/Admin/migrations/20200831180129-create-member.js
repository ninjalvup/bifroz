'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Members', {
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
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
      bonus: {
        type: Sequelize.INTEGER
      },
      line_id: {
        type: Sequelize.STRING
      },
      know_us: {
        type: Sequelize.STRING
      },
      sb_password: {
        type: Sequelize.STRING
      },
      sb_username: {
        type: Sequelize.STRING
      },
      bonus: {
        type: Sequelize.INTEGER
      },
      _id: {
        type: Sequelize.STRING
      },
      group_id: {
        type: Sequelize.STRING
      },
      prefix: {
        type: Sequelize.STRING
      },
      register_date: {
        type: Sequelize.DATE
      },
      new_member: {
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
    return queryInterface.dropTable('Members');
  }
};