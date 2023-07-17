module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      //model의 Comments 를말하는것.
      onDelete: "cascade", // 연결된거 다지움. 지우면
    });
    Posts.hasMany(models.Likes, {
      //model의 Comments 를말하는것.
      onDelete: "cascade", // 연결된거 다지움. 지우면
    });
  };
  return Posts;
};
