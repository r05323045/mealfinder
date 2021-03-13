'use strict'
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Admins',
      [{
        id: 1,
        email: 'admin@example.com',
        password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
        createdAt: new Date(),
        updatedAt: new Date()
      }]
      , {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Admins', null, {})
  }
}
