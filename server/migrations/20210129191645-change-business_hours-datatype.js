'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Restaurants', 'business_hours', {
<<<<<<< HEAD
      type: Sequelize.STRING(1234),
=======
      type: Sequelize.TEXT,
>>>>>>> merge-master-deploy
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Restaurants', 'business_hours', {
      type: Sequelize.STRING(1234),
    });
  }
};
