const mongoose = require('mongoose');

const { Schema } = mongoose;

const ShoppingListSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },

  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'recipe',
      required: true,
    },
  ],

  ingredients: {
    name: {
    amount: String,
    units: String,
    }
  },

});

module.exports = mongoose.model('shopping-list', ShoppingListSchema);
