'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('employeeTimes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clockInHour: {
        type: Sequelize.INTEGER
      },
      clockInMinutes: {
        type: Sequelize.INTEGER
      },
      clockOutHour: {
        type: Sequelize.INTEGER
      },
      clockOutMinutes: {
        type: Sequelize.INTEGER
      },
      employee_id: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      timeStamp: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('employeeTimes');
  }
};