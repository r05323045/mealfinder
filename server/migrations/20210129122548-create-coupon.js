'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    try {
      return queryInterface.createTable('Coupons', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        NO: {
          type: Sequelize.STRING
        },
        price: {
          type: Sequelize.STRING
        },
        status: {
          type: Sequelize.STRING
        },
        description: {
          type: Sequelize.TEXT
        },
        UserId: {
          type: Sequelize.INTEGER
        },
        RestaurantId: {
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
    } catch (e) {}
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Coupons');
  }
};