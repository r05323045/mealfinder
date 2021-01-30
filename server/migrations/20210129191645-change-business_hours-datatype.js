'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Restaurants', 'business_hours', {
      type: Sequelize.JSON,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Restaurants', 'business_hours', {
      type: Sequelize.STRING,
    });
  }
};
