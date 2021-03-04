'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Restaurants', 'business_hours', {
      type: Sequelize.TEXT,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Restaurants', 'business_hours', {
      type: Sequelize.STRING,
    });
  }
};
