// Setting up file requirements
const router = require('express').Router();
const { User, Item, History } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// Gets all Item table data
router.get('/', (req, res) => {
    Item.findAll({
        // From the Item table, it will find all attributes including the item ID, text, title, and timestamp
        attributes: 
        [
            'id',
            'item_text',
            'title',
            'created_at',
        ],
        // Order the item from most recent in descending order
        order: [[ 'created_at', 'DESC']],
        // From the User table, include the username from the User associated with the item. Then, from the History table, include all history edits (which requires their id, history_name, item_id, user_id, and timestamp properties)
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: History,
                attributes: ['id', 'history_name', 'item_id', 'user_id', 'created_at'],
                include: 
                {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbItemData => res.json(dbItemData)) // Returning the result data as JSON Object
    // if there is an error, it will log an error
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Get a single item by it's id
router.get('/:id', (req, res) => {
    Item.findOne({
      where: 
      {
        // Checks for the request's id property, this will make it check for if the id parameter of both the request and the result match
        id: req.params.id
      },
      // From the Item table, it will find all attributes including the item ID, text, title, and timestamp
      attributes: 
      [
        'id',
        'item_text',
        'title',
        'created_at',
      ],
      // From the User table, include the username from the User associated with the item. Then, from the History table, include all history edits (which requires their id, history_name, item_id, user_id, and timestamp properties)
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
            model: History,
            attributes: ['id', 'history_name', 'item_id', 'user_id', 'created_at'],
            include: 
            {
                model: User,
                attributes: ['username']
            }
        }
      ]
    })
    .then(dbItemData => {
        // If there is no matching id for the item requested, log an error
        if (!dbItemData) {
          res.status(404).json({ message: 'No item with this id exists' });
          return;
        }
        res.json(dbItemData); // Returning the result data as JSON Object
    })
      .catch(err => {
        // if there is an error, it will log an error
        console.log(err);
        res.status(500).json(err);
    });
});

// Creates a new item
router.post('/', withAuth, (req, res) => {
    // Creates a new item in the Item table with the properties of title, item_text, and user_id
    Item.create({
        title: req.body.title,
        post_text: req.body.item_text,
        user_id: req.session.user_id
    })
    .then(dbItemData => res.json(dbItemData)) // Returning the result data as JSON Object
    .catch(err => {
        // if there is an error, it will log an error
        console.log(err);
        res.status(500).json(err);
    });
});

// Update an item's title or text for item that matches the requested id
router.put('/:id', withAuth, (req, res) => {
    Item.update(req.body,
        {
            // Checks for the request's id property, this will make it check for if the id parameter of both the request and the result match
            where: 
            {
                id: req.params.id
            }
        }
    )
    .then(dbItemData => {
        // If there is no matching id for the item requested, log an error
        if (!dbItemData) {
            res.status(404).json({ message: 'No item with this id exists' });
            return;
        }
        res.json(dbItemData); // Returning the result data as JSON Object
    })
    .catch(err => {
        // if there is an error, it will log an error
        console.log(err);
        res.status(500).json(err)
    });
});

// Deletes an item for an item that matches the requested id
router.delete('/:id', withAuth, (req, res) => {
    Item.destroy({
      // Checks for the request's id property, this will make it check for if the id parameter of both the request and the result match
      where: 
      {
        id: req.params.id
      }
    })
      .then(dbItemData => {
        // If there is no matching id for the item requested, log an error
        if (!dbItemData) {
          res.status(404).json({ message: 'No item with this id exists' });
          return;
        }
        res.json(dbItemData); // Returning the result data as JSON Object
      })
      .catch(err => {
        // if there is an error, it will log an error
        console.log(err);
        res.status(500).json(err);
    });
});

// Exports the module to be used in other files
module.exports = router;