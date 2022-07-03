// Setting up file requirements
const router = require('express').Router();
const { User, Item, History } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const format_date = require('../../utils/helpers');

// Gets all History table data
router.get('/', (req, res) => {
    History.findAll({
        // From the History table, it will find all attributes including the history ID, history_name, item_id, user_id, and timestamp
        attributes: 
        [
            'id',
            'history_name',
            'item_id',
            'user_id',
            'created_at',
        ],
        // Order the posts from most recent in descending order
        order: [[ 'created_at', 'DESC']],
        // From the User table, include the username from the User associated with the history. Then, from the Item table, include all data from that table (which requires the id, title, item_text, category_id, and timestamp properties)
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Item,
                attributes: ['id', 'title', 'item_text', 'category_id', 'created_at'],
                include: 
                {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbHistoryData => res.json(dbHistoryData)) // Returning the result data as JSON Object
    // if there is an error, it will log an error
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Get a single history edit by it's id
router.get('/:id', (req, res) => {
    History.findOne({
      where: 
      {
        // Checks for the request's id property, this will make it check for if the id parameter of both the request and the result match
        id: req.params.id
      },
      // From the History table, it will find all attributes including the ID, history_name, item_id, user_id, and timestamp
      attributes: 
      [
        'id',
        'history_name',
        'item_id',
        'user_id',
        'created_at',
      ],
      // From the User table, include the username from the User associated with the history edit. Then, from the Item table, include all data from that table (which requires the id, title, item_text, category_id, and timestamp properties)
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
            model: Item,
            attributes: ['id', 'title', 'item_text', 'category_id', 'created_at'],
            include: 
            {
                model: User,
                attributes: ['username']
            }
        }
      ]
    })
    .then(dbHistoryData => {
        // If there is no matching id for the history requested, log an error
        if (!dbHistoryData) {
          res.status(404).json({ message: 'No edit history with this id exists' });
          return;
        }
        res.json(dbHistoryData); // Returning the result data as JSON Object
    })
      .catch(err => {
        // if there is an error, it will log an error
        console.log(err);
        res.status(500).json(err);
    });
});

// Creates a new edit history
router.post('/', withAuth, (req, res) => {
    // Creates a new edit history in the History table with the properties of history_name, item_id, and user_id
    History.create({
        history_name: req.session.user_id + " edited this on " + format_date, // Should read like "Ben edited this on 22/04/2022"
        item_id: req.body.item_id,
        user_id: req.session.user_id
    })
    .then(dbHistoryData => res.json(dbHistoryData)) // Returning the result data as JSON Object
    .catch(err => {
        // if there is an error, it will log an error
        console.log(err);
        res.status(500).json(err);
    });
});

// Deletes edit history for an edit history that matches the requested id
router.delete('/:id', withAuth, (req, res) => {
    History.destroy({
      // Checks for the request's id property, this will make it check for if the id parameter of both the request and the result match
      where: 
      {
        id: req.params.id
      }
    })
      .then(dbHistoryData => {
        // If there is no matching id for the post requested, log an error
        if (!dbHistoryData) {
          res.status(404).json({ message: 'No edit history with this id exists' });
          return;
        }
        res.json(dbHistoryData); // Returning the result data as JSON Object
      })
      .catch(err => {
        // if there is an error, it will log an error
        console.log(err);
        res.status(500).json(err);
    });
});

// Exports the module to be used in other files
module.exports = router;