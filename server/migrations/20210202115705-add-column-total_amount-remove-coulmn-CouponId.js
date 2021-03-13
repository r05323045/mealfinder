'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Orders', 'CouponId'),
      queryInterface.addColumn('Orders', 'total_amount', {
        type: Sequelize.INTEGER,
        allowNull: false
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Orders', 'CouponId', {
        type: Sequelize.INTEGER
      }),
      queryInterface.removeColumn('Orders', 'total_amount')
    ])
  }
};
