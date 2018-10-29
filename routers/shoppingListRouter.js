const shoppingListRouter = require('express').Router();
const { getShoppingList, deleteShoppingList } = require('../controllers/shopping');

shoppingListRouter.route('/:user_id')
  .get(getShoppingList)
  .delete(deleteShoppingList);

module.exports = shoppingListRouter;
