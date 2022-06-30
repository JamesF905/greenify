// Setting up model requirment for History
const { History } = require('../models');

// Defining the properties of historyData
const historyData = [
    {
        history_name: "James created this on 30/06/2022",
        item_id: 1,
        user_id: 2
    },
    {
        history_name: "Ben edited this on 01/07/2022",
        item_id: 1,
        user_id: 1
    },
    {
        history_name: "Ben created this on 30/06/2022",
        item_id: 2,
        user_id: 1
    },
    {
        history_name: "Andrew created this on 30/06/2022",
        item_id: 3,
        user_id: 3
    },
    {
        history_name: "Keegan created this on 30/06/2022",
        item_id: 4,
        user_id: 4
    },
    {
        history_name: "Andrew edited this on 01/07/2022",
        item_id: 4,
        user_id: 3
    },
    {
        history_name: "James created this on 30/06/2022",
        item_id: 5,
        user_id: 2
    },
    {
        history_name: "Bob created this on 30/06/2022",
        item_id: 6,
        user_id: 5
    },
    {
        history_name: "Ben created this on 30/06/2022",
        item_id: 7,
        user_id: 1
    },
    {
        history_name: "James edited this on 01/07/2022",
        item_id: 7,
        user_id: 2
    },
]

// seedHistory arrow function to bulk create History tables based on the historyData defined above
const seedHistory = () => History.bulkCreate(historyData);

// Exports the module to be used in other files
module.exports = seedHistory;