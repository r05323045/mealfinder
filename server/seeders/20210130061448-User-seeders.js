'use strict';
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    function randomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    await queryInterface.bulkInsert('Users',
      Array.from({ length: 10 }).map((item, i) => ({
        id: i * 10 + 1,
        email: `user${i + 1}@example.com`,
        password: bcrypt.hashSync('12345678', 10),
        phone_number: '0912345678',
        location: '台北市',
        CategoryId: Math.floor(Math.random() * 10) + 1,
        gender: 'female',
        birthday: randomDate(new Date(1900, 0, 1), new Date()),
        avatar: `https://i.pravatar.cc/150?img=${i + 2}`,
        name: `user${i + 1}`,
        createdAt: new Date(),
        updatedAt: new Date()
      }))
      , {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
