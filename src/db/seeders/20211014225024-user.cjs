'use strict';
const bcrypt = require('bcrypt');

// User.prototype.generatePasswordHash
const generatePasswordHash = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
 }

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          nickname: 'Maloney',          
          email: 'missy@maloney.com',
          password: await generatePasswordHash('missypass1'),
          createdAt: new Date(Date.UTC(2020, 0, 2, 21, 33, 15, 233)),
          updatedAt: new Date(Date.UTC(2020, 0, 3, 21, 33, 15, 233)),
        },
        {
          nickname: 'Joanne',
          email: 'joanne@lyons.com',
          password: await beforeCreate('joannepass1'),
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
