'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Restaurants', 'coordinates', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Restaurants', 'coordinates', {
      type: Sequelize.DECIMAL,
    });
  }
};
