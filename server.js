// Setting up file requirements
const path = require('path');
require('dotenv').config();
const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
// Handlebars requirement
const exphbs = require('express-handlebars')
// Session cookie requirement
const session = require('express-session')
// Sequelize store requirement to save the session so the user can remain logged in
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Handlebars helpers
const helpers = require('./utils/helpers');

// Initializing handlebars for the html templates for the program
const hbs = exphbs.create({ helpers });

// Initializing the session
const sess = {
    secret: 'test',
    cookie: { maxAge: 7200000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

// Initializing the server
const app = express();

// Defining the server port
const PORT = process.env.PORT || 3001;

// Give the server a path to the public directory for static files (Things such as the javascript and css files will be here)
app.use(express.static(path.join(__dirname, 'public')));

// Setting up handlebars as the template engine for the server
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Making Express parse JSON data and string data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Making the app use Express Session for the session handling
app.use(session(sess));

// Having the server initialize the path to the routes and make it available to use
app.use(routes);

// Turns on connection to database and then to the server, using force: false to maintain data so it doesnt reset the database or clear any values
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});