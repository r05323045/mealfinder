'use strict';
const restaurantData = require('../restaurant-data.json')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const coupons = []
    for (let i = 0; i < restaurantData.length; i++) {
      coupons.push({
        id: i * 10 + 1,
        NO: `AA${i * 10 + 1}`,
        UserId: Math.floor(Math.random() * 5) + 1,
        RestaurantId: i * 10 + 1,
        price: Math.floor(Math.random() * 10) * 10 + 100,
        status: 'used',
        description: `這是${restaurantData[i].name}的coupon！`,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Coupons', coupons, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Coupons', null, {});
  }
};
