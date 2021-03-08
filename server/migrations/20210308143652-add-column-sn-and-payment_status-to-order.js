'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'sn', {
      type: Sequelize.INTEGER
    })
    await queryInterface.addColumn('Orders', 'payment_status', {
      type: Sequelize.STRING
    })
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('Orders', 'sn', {
        type: Sequelize.INTEGER
      })
      await queryInterface.removeColumn('Orders', 'payment_status', {
        type: Sequelize.STRING
      })
    } catch (e) {}
  }
}
