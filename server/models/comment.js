'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Restaurant, {foreignKey: 'RestaurantId'})
      Comment.belongsTo(models.User, {foreignKey: 'UserId'})
      Comment.hasMany(models.Like, { foreignKey: 'CommentId' })
    }
  };
  Comment.init({
    content: DataTypes.TEXT,
    rating: DataTypes.STRING,
    RestaurantId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};