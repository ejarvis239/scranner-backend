const User = require('../models/User.js');

const getUser = (req, res, next) => {
  const { username } = req.params;
  User.find({ username: username })
    .then(([user]) => {
      if (user.length === 0) throw { msg: "user does not exist", status: 404 };
      else res.status(200).send({ user });
    })
    .catch(err => next(err));
};

module.exports = { getUser };
