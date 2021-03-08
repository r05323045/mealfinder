'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: 'UserId' })
      Order.hasMany(models.orderItem)
    }
  };
  Order.init({
    UserId: DataTypes.INTEGER,
    total_amount: DataTypes.INTEGER,
    // CouponId: DataTypes.INTEGER
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    sn: DataTypes.INTEGER,
    payment_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};