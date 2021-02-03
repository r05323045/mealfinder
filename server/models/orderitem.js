'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orderItem.belongsTo(models.Order)
      orderItem.belongsTo(models.Coupon)
    }
  };
  orderItem.init({
    OrderId: DataTypes.INTEGER,
    CouponId: DataTypes.INTEGER,
    purchased_price: DataTypes.INTEGER,
    uniqueId: DataTypes.STRING,
    isUsed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'orderItem',
  });
  return orderItem;
};