'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Prefixes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING
      },
      product: {
        type: Sequelize.STRING
      },
      agent_id: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      line: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
      },
      bg: {
        type: Sequelize.STRING
      },
      bandner: {
        type: Sequelize.STRING
      },
      token_line: {
        type: Sequelize.STRING
      },
      prefix_key: {
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
    return queryInterface.dropTable('Prefixes');
  }
};