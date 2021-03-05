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
    try {
      await queryInterface.removeColumn('Orders', 'name', {
        type: Sequelize.STRING
      })
      await queryInterface.removeColumn('Orders', 'email', {
        type: Sequelize.STRING
      })
    } catch (e) {}
  }
}
