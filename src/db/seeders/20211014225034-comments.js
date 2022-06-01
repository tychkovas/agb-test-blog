'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'comments',
      [
        {
          id: 1,
          userId: 1,                 
          body: 'comments1: Lorem ipsum, Dolor sit, Consectetuer',
          published_at: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
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
    await queryInterface.bulkDelete('comments');
  },
};
