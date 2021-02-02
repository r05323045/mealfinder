'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Orders', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'UserId',
      references: {
        table: 'Users',
        field: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Orders', 'UserId')
  }
};
