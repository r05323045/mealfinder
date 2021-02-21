'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Coupons','status'),
      queryInterface.removeColumn('Coupons', 'UserId')
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Coupons', 'status', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Coupons', 'UserId', {
        type: Sequelize.INTEGER
      })
    ])
  }
};
