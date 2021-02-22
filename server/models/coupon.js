'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Coupon.belongsTo(models.Restaurant)
      Coupon.hasMany(models.orderItem)
      Coupon.belongsToMany(models.Cart, {
        through: models.CartItem,
        foreignKey: 'CouponId',
        as: 'carts'
      })
    }
  };
  Coupon.init({
    NO: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.TEXT,
    RestaurantId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Coupon',
  });
  return Coupon;
};