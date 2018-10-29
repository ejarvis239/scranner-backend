const recipeRouter = require('express').Router();
const { getRecipesByUser } = require('../controllers/recipes');

recipeRouter.route('/:user_id')
  .get(getRecipesByUser);

module.exports = recipeRouter;
