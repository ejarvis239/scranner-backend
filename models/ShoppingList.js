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

  ingredients: [
    {
      name: String,
      amount: Number,
      units: String,
      foodType: {type: String, default: "fresh produce" },
      price: {type: Number, default: 10},
    }
  ],

});

module.exports = mongoose.model('shopping-list', ShoppingListSchema);
