'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Coupons','status'),
      queryInterface.removeColumn('Coupons', 'UserId')
    ])
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
