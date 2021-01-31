'use strict';
const data = require('../city-and-district-data.json')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cities = []
    for (let i = 0; i < data.length; i++) {
      cities.push({
        id: i * 10 + 1,
        name_EN: data[i].CityName,
        name_TW: data[i].CityEngName,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Cities', cities, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cities', null, {});
  }
};
