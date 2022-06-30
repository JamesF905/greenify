// Setting up model requirment for item
const { Item } = require('../models');

// Defining the properties of itemData
const itemData = [
    {
        title: "Jade",
        item_text: "Unlike other plants, Jade can survive a day of direct sunlight. Place it in a pot with a drainage hole and water every two weeks only when the top two inches of soil are dry. To keep it looking fresh, just give dying or dry branches a snip.",
        category_id: 1,
        user_id: 2
    },
    {
        title: "Hoya",
        item_text: "Also known as the Crimson Prince, like other hoyas, this trailing beauty is perfect for displaying in a window that gets bright but indirect light. They love humidity, so try misting it once a week and let the soil dry between waterings. Repot during the spring or summer when the roots start peeking out of the drainage hole.",
        category_id: 1,
        user_id: 1
    },
    {
        title: "Spider Plant",
        item_text: "Even if you skip town for the weekend and forget to assign a friend plant-sitting duties, the spider plant will not punish you for neglecting it. The self-propagating, air-cleaning, petite, and pretty spider plant will grow in low to bright indirect light, making it a great option for apartment dwellers or first-time plant parents.",
        category_id: 1,
        user_id: 3
    },
    {
        title: "Begonias",
        item_text: "These flowers will bloom year after year for you when they are kept in lightly shaded environments. Not only are the flowers beautiful, but so are the leaves. These leaves add texture to the overall feel of the begonia by providing lusciously green, big, and jagged leaves.",
        category_id: 2,
        user_id: 4
    },
    {
        title: "Fuchsia",
        item_text: "This shade loving perennial looks best in hanging baskets. These drooping flowers appear as a fancy chandelier. With fuchsias around, you'll see an increase in birds, butterflies, and hummingbirds.",
        category_id: 2,
        user_id: 2
    },
    {
        title: "Short-Handled Shovel",
        item_text: "The short-handled shovel doubles as a kid-friendly digger as well as a great sidekick for edging and finishing holes for shrubs and small trees. Lightweight and strong, these two-foot long shovels are a cost-effective tool that takes up very little space in your garden shed, although you may find you use it often enough that you'll rarely put it away.",
        category_id: 3,
        user_id: 5
    },
    {
        title: "Tough Love Gloves",
        item_text: "Great gardeners always have a little dirt under their fingernails, but they also know the importance of strong gardening gloves to save them from blisters, callouses, thorns and scratches. The best ones slip on easily but are snug enough for gripping weeds, pruners, and seeds. Always buy more than one pair; they are rarely where you think you've left them.",
        category_id: 3,
        user_id: 1
    },
]

// seedItems arrow function to bulk create Item tables based on the itemData defined above
const seedItems = () => Item.bulkCreate(itemData);

// Exports the module to be used in other files
module.exports = seedItems;