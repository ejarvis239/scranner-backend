const shoppingListRouter = require('express').Router();
const { getShoppingList, deleteShoppingList, updateShoppingList } = require('../controllers/shopping');

shoppingListRouter.route('/:user_id')
  .get(getShoppingList)
  .delete(deleteShoppingList)

shoppingListRouter.route('/:user_id/:recipe_id')
  .patch(updateShoppingList)

module.exports = shoppingListRouter;
