'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Reservation.belongsTo(models.User, { foreignKey: 'UserId' })
      Reservation.belongsTo(models.Restaurant, { foreignKey: 'RestaurantId' })
    }
  };
  Reservation.init({
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    partySize_adult: DataTypes.INTEGER,
    partySize_kids: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    UserName: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    RestaurantId: DataTypes.INTEGER,
    note: DataTypes.TEXT,
    purpose: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reservation'
  })
  return Reservation
}
