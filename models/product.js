'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, {through: models.Cart, foreignKey: 'productId'})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'name is required'},
        notNull: { args: true, msg: 'name is required'}
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'image_url is required'},
        notNull: { args: true, msg: 'image_url is required'}
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'price is required'},
        notEmpty: { args: true, msg: 'price is required'},
        isInt: { args: true, msg: 'price must be a positive integer'},
        min: { args: [0], msg: 'price must be a positive integer'}
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'stock is required'},
        notEmpty: { args: true, msg: 'stock is required'},
        isInt: { args: true, msg: 'stock must be a positive integer'},
        min: { args: [0], msg: 'stock must be a positive integer'}
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};