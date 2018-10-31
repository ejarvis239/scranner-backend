const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  // password: {
  //   type: String,
  //   required: true,
  // },
  profilePicture: {
    type: String,
  },
  address: {
    houseNumber: String,
    street: String,
    city: String,
    postcode: String,
    telephone: String,
  },
});

module.exports = mongoose.model('users', UserSchema);
