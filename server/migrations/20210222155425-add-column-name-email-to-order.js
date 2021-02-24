'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'name', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('Orders', 'email', {
      type: Sequelize.STRING
    })
  },

  down: async (queryInterface, Sequelize) => {
    Promise.all([queryInterface.removeColumn('Orders', 'name', {
      type: Sequelize.STRING
    }), queryInterface.removeColumn('Orders', 'email', {
      type: Sequelize.STRING
    })]).then().catch()
  }
}
