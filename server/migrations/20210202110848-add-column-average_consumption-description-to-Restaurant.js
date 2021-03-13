'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Restaurants', 'average_consumption', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('Restaurants', 'description', {
        type: Sequelize.TEXT
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Restaurants', 'average_consumption'),
      queryInterface.removeColumn('Restaurants', 'description')
    ])
  }
};
