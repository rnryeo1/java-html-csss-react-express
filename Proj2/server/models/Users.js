module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Users.associate = (models) => {
    Users.hasMany(models.Likes, {
      //model의 Comments 를말하는것.
      onDelete: "cascade", // 연결된거 다지움. 지우면
    });
    Users.hasMany(models.Posts, {
      //model의 Comments 를말하는것.
      onDelete: "cascade", // 연결된거 다지움. 지우면
    });
  };

  // Users.associate = (models) =>{
  //     Users.hasMany(models.Posts,{ //model의 Comments 를말하는것.
  //         onDelete: "cascade", // 연결된거 다지움. 지우면
  //     });
  // };
  return Users;
};
