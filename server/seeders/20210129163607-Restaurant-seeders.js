'use strict'
const data = require('../test-restaurant-data.json')
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const restaurants = []
    for (let i = 0; i < data.data.length; i++) {
      try {
        let a = data.data[i].coordinates.replace(/'/g, '"')
      } catch {
        console.log(data.data[i].coordinates, i)
      }
      restaurants.push({
        id: i * 10 + 1,
        place_id: null,
        name: data.data[i].name,
        tel: data.data[i].tel && data.data[i].tel[0] !== '0' ? null : data.data[i].tel,
        address: data.data[i].address,
        coordinates: JSON.stringify(JSON.parse(data.data[i].coordinates.replace(/'/g, '"'))),
        picture: data.data[i].picture,
        business_hours: JSON.stringify(JSON.parse(data.data[i].business_hours.replace(/'/g, '"'))),
        google_map_url: data.data[i].google_map_url,
        day_off: null,
        coupon: true,
        deposit: false,
        rating: data.data[i].rating,
        CategoryId: data.data[i].CategoryId,
        CityId: 1,
        DistrictId: Number(data.data[i].DistrictId),
        createdAt: new Date(),
        updatedAt: new Date(),
        average_consumption: data.data[i].average_consumption ? data.data[i].average_consumption : null,
        description: faker.lorem.text()
      })
    }
    await queryInterface.bulkInsert('Restaurants', restaurants, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Restaurants', null, {})
  }
}
