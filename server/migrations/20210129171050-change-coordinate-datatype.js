'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Restaurants', 'coordinates', {
      type: Sequelize.GEOMETRY('POINT'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Restaurants', 'coordinates', {
      type: Sequelize.DECIMAL,
    });
  }
};
