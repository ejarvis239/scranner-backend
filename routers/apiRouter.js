const apiRouter = require('express').Router();
const userRouter = require('./userRouter');
const recipeRouter = require('./recipeRouter');
const shoppingListRouter = require('./shoppingListRouter');

apiRouter.use('/users', userRouter);
apiRouter.use('/recipes', recipeRouter);
apiRouter.use('/shopping-lists', shoppingListRouter);

module.exports = apiRouter;
