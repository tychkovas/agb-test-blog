export default (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: { type: DataTypes.STRING, allowNull: false },
      body: { type: DataTypes.STRING, allowNull: false },
      published_at: { type: DataTypes.DATE },
    },
    {}
  );
  Post.associate = function (models) {
    Post.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Post;
};
