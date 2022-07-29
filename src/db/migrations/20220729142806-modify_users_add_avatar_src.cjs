'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users', // table name
        'avatar_src', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'avatar_src'),
    ]);
  }
};
