'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'posts',
      [
        {
          id: 1,
          userId: 1,
          title: 'Spring black',          
          body: 'post1: Lorem ipsum, Dolor sit, Consectetuer',
          published_at: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          userId: 1,
          title: 'Summer white',
          body: 'post2: Lorem ipsum, Dolor sit, Consectetuer',
          published_at: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          userId: 2,
          title: 'Spring Yello',          
          body: 'post3: Lorem ipsum, Dolor sit, Consectetuer',
          published_at: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          userId: 2,
          title: 'Fall black',          
          body: 'post4: Lorem ipsum, Dolor sit, Consectetuer',
          published_at: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('posts');
  },
};
