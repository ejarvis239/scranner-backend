const recipeRouter = require('express').Router();
const { getRecipesByUser, addRecipe, deleteRecipe } = require('../controllers/recipes');

recipeRouter.route('/:user_id')
  .get(getRecipesByUser)
  .post(addRecipe);

recipeRouter.route('/:recipe_id')
  .delete(deleteRecipe);

module.exports = recipeRouter;
