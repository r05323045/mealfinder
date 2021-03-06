'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Restaurant.belongsTo(models.Category, { foreignKey: 'CategoryId' })
      Restaurant.belongsTo(models.City)
      Restaurant.belongsTo(models.District)
      Restaurant.belongsToMany(models.User, {
        through: models.Favorite,
        foreignKey: 'RestaurantId',
        as: 'FavoritedUsers'
      })
      Restaurant.hasMany(models.Coupon)
      Restaurant.hasMany(models.Reservation, { foreignKey: 'RestaurantId' })
      // Restaurant.hasMany(models.Favorite, { foreignKey: 'RestaurantId' })
      Restaurant.hasMany(models.Comment, { foreignKey: 'RestaurantId' })
    }
  };
  Restaurant.init({
    place_id: DataTypes.STRING,
    name: DataTypes.STRING,
    tel: DataTypes.STRING,
    address: DataTypes.STRING,
    coordinates: DataTypes.STRING,
    picture: DataTypes.STRING,
    business_hours: DataTypes.TEXT,
    google_map_url: DataTypes.STRING,
    day_off: DataTypes.STRING,
    longitude: DataTypes.STRING,
    latitude: DataTypes.STRING,
    coupon: DataTypes.BOOLEAN,
    deposit: DataTypes.BOOLEAN,
    rating: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER,
    CityId: DataTypes.INTEGER,
    DistrictId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    average_consumption: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Restaurant'
  })
  return Restaurant
}
