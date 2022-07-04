const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class History extends Model {}

History.init(
  {
    id: {
      // Sets the type property to the integer data type, making it require a number value
      type: DataTypes.INTEGER,
      // Setting allowNull property to false so that a value is required, property cant contain nothing
      allowNull: false,
      // Setting primaryKey property to true so that the id value will be the primary key for History table
      primaryKey: true,
      // Setting autoIncrement property to true so that id value will increment for each item in the History table
      autoIncrement: true
    },
    history_name: {
      // Sets the type property to the string data type, making it require a string value, this is where a username is meant to appear
      type: DataTypes.STRING,
      // Setting allowNull property to false so that a value is required, property cant contain nothing
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'history',
  }
);

// Exports History module for use in other files
module.exports = History;
// Commenting to make github recognize this branch, ignore this line