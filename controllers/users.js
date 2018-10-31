const User = require('../models/User.js');

const getUser = (req, res, next) => {
  User.find({ username: req.params.username })
    .then(([user]) => {
      if (user.length === 0) throw { msg: 'user does not exist', status: 404 };
      else res.status(200).send({ user });
    })
    .catch(next);
};

const addUser = (req, res, next) => {
  const newUser = User({
    ...req.body,
    profilePicture: 'default',
    address: {
      houseNumber: null,
      street: null,
      city: null,
      postcode: null,
      telephone: null,
    },
  });
  newUser.save()
    .then((user) => {
      res.status(201).send(user);
    })
    .catch(next);
};

module.exports = { getUser, addUser };
