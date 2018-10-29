const userRouter = require('express').Router();
const { getUser } = require('../controllers/users');

userRouter.route('/:username').get(getUser);

module.exports = userRouter;
