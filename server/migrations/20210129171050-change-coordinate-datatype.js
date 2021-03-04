'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Restaurants', 'coordinates', {
      type: Sequelize.TEXT,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Restaurants', 'coordinates', {
      type: Sequelize.DECIMAL,
    });
  }
};
