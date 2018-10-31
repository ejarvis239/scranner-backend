const ShoppingList = require('../models/ShoppingList.js');
const Recipe = require('../models/Recipe.js');
const {buildBasket} = require('../utils/index.js')

const getShoppingList = (req, res, next) => {
  ShoppingList.findOne({ user: req.params.user_id })
    .populate('user')
    .populate('recipes')
    .then((shoppingList) => {
      res.status(200).send({ shoppingList });
    })
    .catch(next);
};

const deleteShoppingList = (req, res, next) => {
  ShoppingList.findOneAndUpdate(
    { user: req.params.user_id },
    { $set: { recipes: [], ingredients: [] } },
    { new: true },
  )
    .then((shoppingList) => {
      res.status(200).send({ shoppingList });
    })
    .catch(next);
};

const updateShoppingList = (req, res, next) => {
  const update = req.query.update;
  return Promise.all([
    Recipe.findById(req.params.recipe_id),
    ShoppingList.findOne({ user: req.params.user_id })
  ])
    .then(([recipe, shoppingList]) => {
      const [updatedRecipe, updatedIngredients] = buildBasket(recipe, shoppingList.recipes, shoppingList.ingredients, update)
      return ShoppingList.findByIdAndUpdate(shoppingList._id,
        { $set: { recipes: updatedRecipe, ingredients: updatedIngredients } },
        { new: true })
        // .populate('user')
        // .populate('recipes')
    })
    .then((shoppingList) => {
      res.status(200).send({ shoppingList })
    })
    .catch(next);
};

module.exports = { getShoppingList, deleteShoppingList, updateShoppingList };
