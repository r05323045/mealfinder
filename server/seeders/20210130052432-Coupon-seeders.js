'use strict'
const restaurantData = require('../data/simple-restaurant-data.json')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const coupons = []
    const mealTitle = ['一人獨享餐', '雙人套餐', '買三送一分享餐', '四人派對餐']
    for (let i = 0; i < 30; i++) {
      if (restaurantData.data[i].average_consumption) {
        const mealNumber = Math.floor(Math.random() * 4)
        coupons.push({
          id: i * 10 + 1,
          NO: `AA${i * 10 + 1}`,
          RestaurantId: i * 10 + 1,
          price: (mealNumber + 1) * restaurantData.data[i].average_consumption,
          description: `${restaurantData.data[i].name}${mealTitle[mealNumber]}`,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
    }
    await queryInterface.bulkInsert('Coupons', coupons, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Coupons', null, {})
  }
}
