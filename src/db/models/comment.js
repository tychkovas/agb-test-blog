'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      body: { type: DataTypes.STRING, allowNull: false },      
      published_at: { type: Sequelize.DATE },
      // author: {},
    },
    {}
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, { foreignKey: 'commentId' });
  };
  return Comment;
};