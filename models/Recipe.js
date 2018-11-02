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
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  ingredients: [{
    name: String,
    amount: Number,
    units: String,
    foodType: {type: String, default: "unknown"},
    price: Number,
    }],

});

module.exports = mongoose.model('recipe', RecipeSchema);
