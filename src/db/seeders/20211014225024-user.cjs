'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          nickname: 'Maloney',          
          email: 'missy@maloney.com',
          password: 'missypass1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
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
    await queryInterface.bulkDelete('Users');
  },
};
