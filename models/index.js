// Setting up model requirements
const User = require('./User');
const Item = require('./Item');
const Category = require('./Category');
const History = require('./History');

// User table will have one or multiple Item tables based on their user_id
User.hasMany(Item, {
    foreignKey: 'user_id'
});

// Creates a relationship between Item and User tables based on user_id
Item.belongsTo(User, {
    foreignKey: 'user_id'
});

// Creates a relationship between Item and User tables based on user_id, and setting it up so that if a user is deleted, all of their items are also deleted as well, and making it invoke hooks from User.js
Item.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks:true
});

// Creates a relationship between Item and Category tables based on post_id, and setting it up so that if a category is deleted, all of the items that belong to it are also deleted as well, and making it invoke hooks from User.js
Item.belongsTo(Category, {
    foreignKey: 'category_id',
    onDelete: 'cascade',
    hooks: true
});

// User table will have one or multiple Item tables based on their user_id, and setting it up so that if a user is deleted, all of their comments are also deleted as well, and making it invoke hooks from User.js
User.hasMany(Item, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks:true
});

// Item table will have one or multiple History tables based on their item_id, and setting it up so that if a item is deleted, all of the edit history that belong to it are also deleted as well, and making it invoke hooks from User.js
Item.hasMany(History, {
    foreignKey: 'item_id',
    onDelete: 'cascade',
    hooks:true
});

// Exports the module to be used in other files
module.exports = { User, Item, Comment, History };