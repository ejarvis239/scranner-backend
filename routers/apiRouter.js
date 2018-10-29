const apiRouter = require('express').Router();
const userRouter = require('./userRouter');
const recipeRouter = require('./recipeRouter.js');

apiRouter.use('/users', userRouter);
apiRouter.use('/recipes', recipeRouter);

module.exports = apiRouter;
