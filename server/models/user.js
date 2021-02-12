'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.PreferedCategory)
      User.hasMany(models.Order, { foreignKey: 'UserId' })
      User.hasMany(models.Comment, { foreignKey: 'UserId' })
      User.hasMany(models.Reservation, { foreignKey: 'UserId' })
      User.belongsTo(models.District)
      User.belongsToMany(models.Restaurant, {
        through: models.Favorite,
        foreignKey: 'UserId',
        as: 'FavoritedRestaurants'
      })
      // User.hasMany(models.Favorite, { foreignKey: 'UserId' })
      User.hasMany(models.Like, { foreignKey: 'UserId' })
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    location: DataTypes.STRING,
    // CategoryId: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    birthday: DataTypes.DATE,
    avatar: DataTypes.STRING,
    name: DataTypes.STRING,
    DistrictId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};