const createModel = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', 
      {
        product_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        product_name: {
          type: DataTypes.STRING,
        },
        quantity: {
          type: DataTypes.FLOAT,
        },
        price: {
          type: DataTypes.FLOAT,
        },
        image: {
          type: DataTypes.STRING,
        },
        user_id: {
          type: DataTypes.INTEGER,
        },
      },
      {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
      },
    );
    Product.associate = function (models) {
        Product.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    }
    return Product
  }
  module.exports = createModel
  