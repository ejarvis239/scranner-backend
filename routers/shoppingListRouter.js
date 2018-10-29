const shoppingListRouter = require('express').Router();
const { getShoppingList } = require('../controllers/shopping');

shoppingListRouter.route('/:user_id')
  .get(getShoppingList);

module.exports = shoppingListRouter;
