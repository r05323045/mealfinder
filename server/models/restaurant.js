'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Restaurant.init({
    place_id: DataTypes.STRING,
    name: DataTypes.STRING,
    tel: DataTypes.STRING,
    address: DataTypes.STRING,
    coordinate_lat: DataTypes.STRING,
    coordinate_lng: DataTypes.STRING,
    picture: DataTypes.STRING,
    business_hours: DataTypes.STRING,
    google_map_url: DataTypes.STRING,
    day_off: DataTypes.STRING,
    coupon: DataTypes.BOOLEAN,
    deposit: DataTypes.BOOLEAN,
    rating: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER,
    CityId: DataTypes.INTEGER,
    DistrictId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};