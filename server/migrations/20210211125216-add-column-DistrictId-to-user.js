'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'DistrictId', {
      type: Sequelize.INTEGER
    })
  },

  down: async (queryInterface, Sequelize) => {
    Promise.all([queryInterface.removeColumn('Users', 'DistrictId', {
      type: Sequelize.INTEGER
    })]).then().catch()
  }
}
