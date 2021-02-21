'use strict'
const data = require('../category-data.json')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = []
    for (let i = 0; i < data.length; i++) {
      categories.push({
        id: i * 10 + 1,
        name: data[i].name_TW,
        picture: `https://loremflickr.com/320/240/restaurant,food/?lock=${Math.random() * 100}`,
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
