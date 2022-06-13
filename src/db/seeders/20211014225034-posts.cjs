'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Posts',
      [
        {
          userId: 1,
          title: 'Spring black',          
          body: 'post1: Lorem ipsum, Dolor sit, Consectetuer',
          published_at: new Date(Date.UTC(2020, 0, 10, 21, 33, 15, 233)),
          createdAt: new Date(Date.UTC(2020, 0, 10, 21, 33, 15, 233)),
          updatedAt: new Date(Date.UTC(2020, 0, 10, 21, 33, 15, 233)),
        },
        {
          userId: 1,
          title: 'Summer white',
          body: 'post2: Lorem ipsum, Dolor sit, Consectetuer',
          published_at: new Date(Date.UTC(2018, 0, 10, 21, 33, 15, 233)),
          createdAt: new Date(Date.UTC(2018, 0, 10, 21, 33, 15, 233)),
          updatedAt: new Date(Date.UTC(2018, 0, 10, 21, 33, 15, 233)),
        },
        {
          userId: 2,
          title: 'Spring Yello',          
          body: 'post3: Lorem ipsum, Dolor sit, Consectetuer',
          published_at: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          title: 'Fall black',          
          body: 'post4: Lorem ipsum, Dolor sit, Consectetuer',
          published_at: new Date(Date.UTC(2019, 0, 10, 21, 33, 15, 233)),
          createdAt: new Date(Date.UTC(2019, 0, 10, 21, 33, 15, 233)),
          updatedAt: new Date(Date.UTC(2019, 0, 10, 21, 33, 15, 233)),
        },
      ],
      {}
    ),

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts');
  },
};
