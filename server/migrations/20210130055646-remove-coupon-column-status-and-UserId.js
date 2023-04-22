'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Coupons', 'status')
    await queryInterface.removeColumn('Coupons', 'UserId')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Coupons', 'status', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Coupons', 'UserId', {
      type: Sequelize.INTEGER
    });
  }
};
