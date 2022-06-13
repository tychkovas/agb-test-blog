'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Comments',
      [
        {
          userId: 1,                 
          body: 'comments1: Lorem ipsum, Dolor sit, Consectetuer',
          published_at: new Date(Date.UTC(2020, 1, 9, 9, 0, 0, 0)),
          createdAt: new Date(Date.UTC(2020, 1, 9, 9, 0, 0, 0)),
          updatedAt: new Date(Date.UTC(2021, 2, 9, 9, 0, 0, 0)),
        },
        {
          userId: 2,          
          body: 'comments2: Lorem ipsum, Dolor sit, Consectetuer',
          published_at: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },        
      ],
      {}
    ),

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments');
  },
};
