'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'address', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('Orders', 'phone', {
      type: Sequelize.STRING
    })
  },

  down: async (queryInterface, Sequelize) => {
    Promise.all([queryInterface.removeColumn('Orders', 'address', {
      type: Sequelize.STRING
    }), queryInterface.removeColumn('Orders', 'phone', {
      type: Sequelize.STRING
    })]).then().catch()
  }
}
