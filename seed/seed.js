const mongoose = require('mongoose');
const { Recipe, ShoppingList, User } = require('../models/index.js');
const { formatRecipe, formatShoppingList } = require('../utils/index.js');

const seed = ({ recipes, shoppingData, users }) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return User.insertMany(users);
    })
    .then((userDocs) => {
      return Promise.all([
        userDocs,
        Recipe.insertMany(formatRecipe(userDocs, recipes)),
      ]);
    })
    .then(([userDocs, recipeDocs]) => {
      return Promise.all([
        userDocs,
        recipeDocs,
        ShoppingList.insertMany(formatShoppingList(userDocs, recipeDocs, shoppingData)),
      ]);
    });
};

module.exports = seed;
