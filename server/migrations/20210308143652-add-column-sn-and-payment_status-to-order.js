'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'sn', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('Orders', 'payment_status', {
      type: Sequelize.STRING
    });
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Orders', 'sn'),
      queryInterface.removeColumn('Orders', 'payment_status')
    ]);
  }
};
