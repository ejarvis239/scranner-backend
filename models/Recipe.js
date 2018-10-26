const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  servings: {
    type: Number,
    required: true
  },
  ingredients: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      amount: String,
      units: String
    }
  }]

});

module.exports = mongoose.model('recipe', RecipeSchema);
