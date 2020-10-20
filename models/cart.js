'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, {through: models.Cart, foreignKey: 'userId'})
      Cart.belongsTo(models.Product, {through: models.Cart, foreignKey: 'productId'})
    }
  };
  Cart.init({
    id: { // ditambah ini kalo belong to many
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};