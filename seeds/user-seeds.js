// Setting up model requirment for User
const { User } = require('../models');
const bcrypt = require('bcrypt');
let encryptedPassword = bcrypt.hashSync("test12345", 10);
// Defining the properties of userData
const userData = [
    {
        username: "Ben",
        email: "ben@email.com",
        password: encryptedPassword
    },
    {
        username: "James",
        email: "james@email.com",
        password: encryptedPassword
    },
    {
        username: "Andrew",
        email: "andrew@email.com",
        password: encryptedPassword
    },
    {
        username: "Keegan",
        email: "keegan@email.com",
        password: encryptedPassword
    },
    {
        username: "Bob",
        email: "bob@email.com",
        password: encryptedPassword
    },
];

// seedUsers arrow function to bulk create User tables based on the userData defined above
// NOTE TO SELF: In documentation I have seen conflicting things about bulkCreate and not working with hashed/unhashed passwords, will need to look into this with further testing
const seedUsers = () => User.bulkCreate(userData);

// Exports the module to be used in other files
module.exports = seedUsers;