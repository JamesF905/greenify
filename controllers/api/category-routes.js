// Setting up file requirements
const router = require('express').Router();
const { User, Item, History, Category } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// Gets all Item table data
router.get('/', (req, res) => {
    Category.findAll({
        // From the Category table, it will find all attributes including the ID and category name
        attributes: 
        [
            'id',
            'category_name',
        ],
        // Order the category by id in descending order
        order: [[ 'id', 'DESC']],
        // From the User table, include the username from the User associated with the item. Then, from the Item table, include all data from that table (which requires the id, title, item_text, category_id, and timestamp properties). And finally, from the History table, include all history edits (which requires their id, history_name, item_id, user_id, and timestamp properties)
        include: [
            {
                model: Item,
                attributes: ['id', 'title', 'item_text', 'category_id', 'created_at'],

            }
        ]
    })
    .then(dbCategoryData => res.json(dbCategoryData)) // Returning the result data as JSON Object
    // if there is an error, it will log an error
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Get a single category by it's id
router.get('/:id', (req, res) => {
    Category.findOne({
        where: 
        {
            // Checks for the request's id property, this will make it check for if the id parameter of both the request and the result match
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
            }
        ]
    })
    .then(dbCategoryData => {
        // If there is no matching id for the category requested, log an error
        if (!dbCategoryData) {
          res.status(404).json({ message: 'No category with this id exists' });
          return;
        }
        res.json(dbCategoryData); // Returning the result data as JSON Object
    })
      .catch(err => {
        // if there is an error, it will log an error
        console.log(err);
        res.status(500).json(err);
    });
});

// Creates a new category
router.post('/', withAuth, (req, res) => {
    // Creates a new categoru in the Category table with the properties of category_name
    Category.create({
        category_name: req.body.category_name,
    })
    .then(dbCategoryData => res.json(dbCategoryData)) // Returning the result data as JSON Object
    .catch(err => {
        // if there is an error, it will log an error
        console.log(err);
        res.status(500).json(err);
    });
});

// Update a category's category_name for category that matches the requested id
router.put('/:id', withAuth, (req, res) => {
    Category.update(req.body,
        {
            // Checks for the request's id property, this will make it check for if the id parameter of both the request and the result match
            where: 
            {
                id: req.params.id
            }
        }
    )
    .then(dbCategoryData => {
        // If there is no matching id for the item requested, log an error
        if (!dbCategoryData) {
            res.status(404).json({ message: 'No category with this id exists' });
            return;
        }
        res.json(dbCategoryData); // Returning the result data as JSON Object
    })
    .catch(err => {
        // if there is an error, it will log an error
        console.log(err);
        res.status(500).json(err)
    });
});

// Deletes a category for a category that matches the requested id
router.delete('/:id', withAuth, (req, res) => {
    Category.destroy({
      // Checks for the request's id property, this will make it check for if the id parameter of both the request and the result match
      where: 
      {
        id: req.params.id
      }
    })
      .then(dbCategoryData => {
        // If there is no matching id for the category requested, log an error
        if (!dbCategoryData) {
          res.status(404).json({ message: 'No category with this id exists' });
          return;
        }
        res.json(dbCategoryData); // Returning the result data as JSON Object
      })
      .catch(err => {
        // if there is an error, it will log an error
        console.log(err);
        res.status(500).json(err);
    });
});

// Exports the module to be used in other files
module.exports = router;