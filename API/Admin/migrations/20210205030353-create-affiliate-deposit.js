'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Affiliate_Deposits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      member_uuid_member: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.DOUBLE(14,2)
      },
      percent_value: {
        type: Sequelize.DOUBLE(14,2)
      },
      status: {
        type: Sequelize.INTEGER
      },
      wallet_uuid: {
        type: Sequelize.STRING
      },
      deposite_date: {
        allowNull: false,
        type: Sequelize.DATE
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
    return queryInterface.dropTable('Affiliate_Deposits');
  }
};