// Setting up model requirments for Users, Categories, Items, and History
const seedUsers = require('./user-seeds');
const seedCategories = require('./category-seeds');
const seedItems = require('./item-seeds');
const seedHistory = require('./history-seeds');
// Setting up sequelize connection requirment
const sequelize = require('../config/connection');

// Loads all seed data
const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
  
    await seedCategories();
    console.log('\n----- CATEGORIES SEEDED -----\n');
  
    await seedItems();
    console.log('\n----- ITEMS SEEDED -----\n');

    await seedHistory();
    console.log('\n----- HISTORY SEEDED -----\n');
  
    process.exit(0);
  };
  
  // Calling the seedAll function
  seedAll();