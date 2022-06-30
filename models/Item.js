// Setting up requirements for Model, DataTypes, and Sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Making the Item class extend from the Model
class Item extends Model {}
// Assigning the properties to the Item class
Item.init(
    {
        // id property, must be an integer, cannot have a value of null, is the primary key of the Item model, and auto increments the id value based on how many items are in the Item table
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // title property, must be a string and cannot have a value of null
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // item_text property, must be text, cannot have a value of null, and to validate it, it must have at least 1 character as its value
        item_text: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        // user_id property, must be an integer, and will reference the id property from the User table
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        // Pass in the imported sequelize connection to the database, while not allowing the database table name to be pluralized, and using underscores instead of camel-casing, then assigning the model's name in the database
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'item'
    }
)

// Exports the module to be used in other files
module.exports = Item;