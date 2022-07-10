const createModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', 
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
      },
      full_name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      role_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    },
  );
  User.associate = function (models) {
    User.belongsTo(models.Role, { foreignKey: "role_id", as: "role" });
    User.hasMany(models.Product, { foreignKey: "user_id", as: "product"});
  }
  return User
}
module.exports = createModel
