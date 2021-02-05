'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Comments', 'ReservationId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      reference: {
        model: 'Reservations',
        key: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Comments', 'ReservationId')
  }
};
