// Setting up dependencies for the file
// Sequelize constructor
const Sequelize = require('sequelize');
// dotenv for local environmental variables like username and password
require('dotenv').config();

// Assigning sequelize a value of nothing to be assigned later in the code
let sequelize;

/* The process.env global variable is injected by Node at runtime, if the environment contains a JAWSDB_URL which is used in the .env to connect to the Heroku Jaws database, then it will create a new Sequelize instance,
otherwise it will create a Sequelize instance with names for the database name, user, and password
*/
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}

module.exports = sequelize;