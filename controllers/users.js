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
    username: req.body.username.toLowerCase(),
    email: req.body.email.toLowerCase(),
    firstName: req.body.firstName.toLowerCase(),
    lastName: req.body.lastName.toLowerCase(),
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
      console.log(user)
      res.status(201).send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const {updatedUsername, updatedFirstName, updatedLastName, updatedEmail} = req.body
  User.findByIdAndUpdate(req.params.user_id,
    { $set: { username: updatedUsername.toLowerCase(), firstName: updatedFirstName.toLowerCase(), lastName: updatedLastName.toLowerCase(), email: updatedEmail.toLowerCase() } },
    { new: true })
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

module.exports = { getUser, addUser, updateUser };
