// Setting up requirements for Model, DataTypes, and Sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// Requiring bcrypt for password hashing
const bcrypt = require('bcrypt');

// Making the User class extend from the Model
class User extends Model {
    // Creating a method to run on a user's login to check the password from the login route with the hashed database password from bcrypt
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// Assigning the properties to the User class
User.init(
  {
    // id property, must be an integer, cannot have a value of null, is the primary key of the User model, and auto increments the id value based on how many items are in the User table
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        // username property, must be a string, cannot have a value of null, and validates to check if the value is empty or not
        username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
        },
        // email property, must be a string, cannot have a value of null, will only allow unique emails (no duplicates in the table), and a validation to check the format of the string entered is an actual email (placeholder@placeholder.placeholder)
        email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
            }
        },
        // password property, must be a string, cannot have a value of null, and validates to check if the password is at least 4 characters long
        password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4]
            }
        }
  },
  {
    // Hook for password hashing
    hooks: {
        // Using beforeCreate to hash the password for newUserData before creating the object in the database while setting the cost/work factor to the default value of 10, then returning the newUserData object
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
          },
        // Using beforeUpdate to hash the password for updatedUserData before updating the object in the database while setting the cost/work factor to the default value of 10, then returning the updatedUserData object
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
          }
    },
    // Pass in the imported sequelize connection to the database, setting it up so it doesn't automatically create createdAt/updatedAt timestamp fields, while not allowing the database table name to be pluralized, and using underscores instead of camel-casing, then assigning the model's name in the database
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

// Exports the module to be used in other files
module.exports = User;