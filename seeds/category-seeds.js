// Setting up model requirment for Category
const { Category } = require('../models');

// Defining the properties of categoryData
const categoryData = [
    {
        category_name: "Indoor Plants",
    },
    {
        category_name: "Outdoor Plants",
    },
    {
        category_name: "Beginner Plants",
    },
    {
        category_name: "Products",
    },
]

// seedCategories arrow function to bulk create Category tables based on the categoryData defined above
const seedCategories = () => Category.bulkCreate(categoryData);

// Exports the module to be used in other files
module.exports = seedCategories;