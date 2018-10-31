const userRouter = require('express').Router();
const { getUser, addUser } = require('../controllers/users');

userRouter.route('/:username')
  .get(getUser);

userRouter.route('/')
  .post(addUser);

module.exports = userRouter;
