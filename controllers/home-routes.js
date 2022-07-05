// Setting up file requirements
const sequelize = require('../config/connection');
const { User, Item, History, Category } = require('../models');
const router = require('express').Router();


// On the home page, find all categories
router.get('/', (req, res) => {
// Reads the whole Category table with the findAll method
    Category.findAll({
        // From the Category table, it will find all attributes including the ID and category name
        attributes: 
        [
            'id',
            'category_name',
        ],
        // From the User table, include the username from the User associated with the item. Then, from the Item table, include all data from that table (which requires the id, title, item_text, category_id, and timestamp properties). And finally, from the History table, include all history edits (which requires their id, history_name, item_id, user_id, and timestamp properties)
        include: [
            {
                model: Item,
                attributes: ['id', 'title', 'item_text', 'category_id', 'created_at'],
            }
        ]
    })
    // Creating an array for the categories and using the get method to trim extra sequelize object data out (plain: true is required for this as it makes it a plain object)
    .then(dbCategoryData => {
        const categories = dbCategoryData.map(category => category.get({ plain: true }));

        // Passing the categories into the homepage template
        res.render('homepage', { categories, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        // if there is an error, it will log an error
        console.log(err);
        res.status(500).json(err);
    });
});

// Renders the login page (if login button is clicked, should work that way anyway), and if the user is logged in, they will be redirected to the home page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    // This makes it render the login page handlebar
    res.render('login');
});

// This works the same as the login page code above, except the signup counts as a login, and has no redirect code in it as it isn't needed
router.get('/signup', (req, res) => {
    res.render('signup');
});

// When a user clicks on a category on the home page, it will view that category with the list of items belonging to it.
router.get('/category/:id', (req, res) => {
    Category.findOne({
            // Checks for the request's id property, this will make it check for if the id parameter of both the request and the result match
            where: 
            {
                id: req.params.id
            },
            // From the Category table, it will find all attributes including the ID, and category_name
            attributes: 
            [
                'id',
                'category_name',
            ],
            // From the User table, include the username from the User associated with the item. Then, from the Item table, include all data from that table (which requires the id, title, item_text, category_id, and timestamp properties). And finally, from the History table, include all history edits (which requires their id, history_name, item_id, user_id, and timestamp properties)
            include: [
                {
                    model: Item,
                    attributes: ['id', 'title', 'item_text', 'category_id', 'created_at'],
                },
            ]
        })
        .then(dbCategoryData => {
            // If there is no matching id for the category requested, log an error
            if (!dbCategoryData) {
                res.status(404).json({ message: 'No category with this id exists' });
                return;
            }
            // Serialize the category data, removing extra sequelize meta data. No mapping is needed here because we are only grabbing one category with the findOne method above (plain: true is required for this as it makes it a plain object)
            const items = dbCategoryData.map(category => category.get({ plain: true }));

            // Passing the category and a session variable into the single category page template
            res.render('single-category', { items, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            // if there is an error, it will log an error
            console.log(err);
            res.status(500).json(err);
        });
});

// Exports the module to be used in other files
module.exports = router;