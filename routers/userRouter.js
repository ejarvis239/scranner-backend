const userRouter = require('express').Router();
const { getUser, addUser, updateUser } = require('../controllers/users');

userRouter.route('/:username')
  .get(getUser)

userRouter.route('/:user_id')
  .patch(updateUser)

userRouter.route('/')
  .post(addUser);

module.exports = userRouter;
