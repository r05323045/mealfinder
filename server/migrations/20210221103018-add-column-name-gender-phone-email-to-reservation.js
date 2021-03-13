'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Reservations', 'UserName', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('Reservations', 'gender', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('Reservations', 'phone', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('Reservations', 'email', {
      type: Sequelize.STRING
    })
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('Reservations', 'UserName', {
        type: Sequelize.STRING
      })
      await queryInterface.removeColumn('Reservations', 'gender', {
        type: Sequelize.STRING
      })
      await queryInterface.removeColumn('Reservations', 'phone', {
        type: Sequelize.STRING
      })
      await queryInterface.removeColumn('Reservations', 'email', {
        type: Sequelize.STRING
      })
    } catch (e) {}
  }
}
