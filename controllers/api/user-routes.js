// Setting up file requirements
const router = require('express').Router();
const { User, Item, History } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');

// Setting up the SequelizeStore to save the session so the user can stay logged in
const SequelizeStore = require('connect-session-sequelize')(session.Store);


// Get all users
router.get('/', (req, res) => {
    // Running the findAll method to get all Users in the table
    User.findAll({
        // When the requested data is recieved, exclude the password property for security
        attributes: { exclude: ['password'] }
    })
      .then(dbUserData => res.json(dbUserData)) // Returning the result data as JSON Object
      .catch(err => {
        // if there is an error, it will log an error
        console.log(err);
        res.status(500).json(err);
    });
});

// Get a single user by id
router.get('/:id', (req, res) => {
    // Running the findOne method to get a single User from the table which has a matching id value
    User.findOne({
      // When the requested data is recieved, exclude the password property for security
      attributes: { exclude: ['password'] },
      where: {
        // Checks for the request's id property, this will make it check for if the id parameter of both the request and the result match
        id: req.params.id
      },
      // Includes the items the user has created as well as the edit history the user has made
      include: [
        {
          model: Item,
          attributes: ['id', 'title', 'item_text', 'created_at']
        },
        {
            model: History,
            attributes: ['id', 'history_name', 'item_id', 'user_id', 'created_at'],
            include: {
                model: Item,
                attributes: ['title']
            }
        }
      ]
    })
      .then(dbUserData => {
        if (!dbUserData) {
          // If there is no matching id for the user requested, log an error
          res.status(404).json({ message: 'No user with this id exists' });
          return;
        }
        res.json(dbUserData); // Returning the result data as JSON Object
      })
      .catch(err => {
        // if there is an error, it will log an error
        console.log(err);
        res.status(500).json(err);
    });
});

// Adds a new user
router.post('/', (req, res) => {
    // Creates a new user in the User table with the properties of username, email, and password
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      // Sends the user data back to the client as confirmation and then saves the session
      .then(dbUserData => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
      
          res.json(dbUserData); // Returning the result data as JSON Object
        });
    })
      // if there is an error, it will log an error
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Login route for the user
router.post('/login',  (req, res) => {
    // Running the findOne method to get a single User from the table which has a matching email value
    User.findOne({
        where: 
        {
        // Checks for the request's email property, this will make it check for if the email parameter of both the request and the result match
        email: req.body.email
        }
    }).then(dbUserData => {
        // If there is no matching email for the email requested, log an error
        if (!dbUserData) {
        res.status(400).json({ message: 'No user exists with that email address!' });
        return;
        }
        // Calling the checkPassword method as from the User model to verify if the user's entered password is valid
        const validPassword = dbUserData.checkPassword(req.body.password);
        // If the password entered doesn't match the existing password for the user attemtping to log in, log an error
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        // Save the session, and return the user object with the associated properties, then log a success message
        req.session.save(() => {
          // declare session variables
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
    
          res.json({ user: dbUserData, message: 'Cool, you logged in!' }); // Returning the result data as JSON Object
        });
    });  
});

// Log out an existing user
router.post('/logout', withAuth, (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        // Sets result status to 204 because the client wont need to load a new page, ends the logged in session
        res.status(204).end();
      });
    } else {
      // If there is any issue with the logged in session, then the session will end
      res.status(404).end();
    }
})

// Updates an existing user by id
router.put('/:id', withAuth, (req, res) => {
    // Updates an existing user in the User table with the properties of username, email, and password. Will only update key/value pairs that are passed through
    User.update(req.body, {
        // Using a hook to hash only the password (hook originates from User model)
        individualHooks: true,
        where: 
        {
            // Checks for the request's id property, this will make it check for if the id parameter of both the request and the result match
            id: req.params.id
        }
    })
      .then(dbUserData => {
        // If there is no matching id for the user requested, log an error
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'No user with this id exists' });
          return;
        }
        res.json(dbUserData); // Returning the result data as JSON Object
      })
      .catch(err => {
        // if there is an error, it will log an error
        console.log(err);
        res.status(500).json(err);
    });
})

// Deletes an existing user by id
router.delete('/:id', withAuth, (req, res) => {
    // Deletes a user based on their id
    User.destroy({
      where: 
      {
        // Checks for the request's id property, this will make it check for if the id parameter of both the request and the result match
        id: req.params.id
      }
    })
      .then(dbUserData => {
        // If there is no matching id for the user requested, log an error
        if (!dbUserData) {
          res.status(404).json({ message: 'No user with this id exists' });
          return;
        }
        res.json(dbUserData); // Returning the result data as JSON Object
      })
      .catch(err => {
        // if there is an error, it will log an error
        console.log(err);
        res.status(500).json(err);
    });
});

// Exports the module to be used in other files
module.exports = router;