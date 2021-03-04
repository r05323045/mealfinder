'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Restaurants', 'business_hours', {
      type: Sequelize.JSONDB,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Restaurants', 'business_hours', {
      type: Sequelize.STRING,
    });
  }
};
