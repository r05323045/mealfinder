'use strict'
const data = require('../data/category-data.json')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = []
    for (let i = 0; i < data.length; i++) {
      categories.push({
        id: i * 10 + 1,
        name: data[i].name_TW,
        picture: data[i].icon,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Categories', categories, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
  }
}
