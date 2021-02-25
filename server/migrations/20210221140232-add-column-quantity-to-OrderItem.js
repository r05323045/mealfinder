'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('orderItems', 'quantity', {
      type: Sequelize.INTEGER
    })
  },

  down: async (queryInterface, Sequelize) => {
    Promise.all([queryInterface.removeColumn('orderItems', 'quantity', {
      type: Sequelize.INTEGER
    })]).then().catch()
  }
}
