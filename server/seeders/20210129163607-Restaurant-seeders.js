'use strict';
const data = require('../restaurant-data.json')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const restaurants = []
    for (let i = 0; i < data.length; i++) {
      restaurants.push({
        id: i * 10 + 1,
        place_id: data[i].place_id,
        name: data[i].name,
        tel: data[i].tel,
        address: data[i].address,
        coordinates: JSON.stringify(data[i].coordinates),
        picture:`https://loremflickr.com/320/240/restaurant,food/?lock=${Math.random() * 100}`,
        business_hours: JSON.stringify(data[i].business_hours), 
        google_map_url: data[i].google_map_url,
        day_off: "N/A",
        coupon: true,
        deposit: false,
        rating: data[i].rating.toString(),
        CategoryId: (Math.floor(Math.random() * 16) * 10 + 1),
        CityId: data[i].CityId,
        DistrictId: data[i].DistrictId,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Restaurants', restaurants, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Restaurants', null, {});
  }
};
