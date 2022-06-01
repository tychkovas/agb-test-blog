'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,          
          nickname: 'Maloney',          
          email: 'missy@maloney.com',
          password: 'missypass1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          nickname: 'Joanne',
          email: 'joanne@lyons.com',
          password: 'joannepass1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users');
  },
};
