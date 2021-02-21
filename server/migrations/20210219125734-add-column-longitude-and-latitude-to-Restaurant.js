'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Restaurants', 'longitude', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('Restaurants', 'latitude', {
      type: Sequelize.STRING
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Restaurants', 'longitude')
    await queryInterface.removeColumn('Restaurants', 'latitude')
  }
}
