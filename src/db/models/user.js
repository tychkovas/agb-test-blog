'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      nickname: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Post, { as: 'users', foreignKey: 'authorId' });
    User.hasMany(models.Comment, { as: 'users', foreignKey: 'userId' });
  };
  return User;
};
