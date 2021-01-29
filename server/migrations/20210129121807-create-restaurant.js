'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Restaurants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      place_id: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      coordinates: {
        type: Sequelize.DECIMAL
      },
      picture: {
        type: Sequelize.STRING
      },
      business_hours: {
        type: Sequelize.STRING
      },
      google_map_url: {
        type: Sequelize.STRING
      },
      day_off: {
        type: Sequelize.STRING
      },
      coupon: {
        type: Sequelize.BOOLEAN
      },
      deposit: {
        type: Sequelize.BOOLEAN
      },
      rating: {
        type: Sequelize.STRING
      },
      CategoryId: {
        type: Sequelize.INTEGER
      },
      CityId: {
        type: Sequelize.INTEGER
      },
      DistrictId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Restaurants');
  }
};