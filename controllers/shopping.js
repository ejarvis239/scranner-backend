const ShoppingList = require('../models/ShoppingList.js');

const getShoppingList = (req, res, next) => {
  ShoppingList.find({ user: req.params.user_id })
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


module.exports = { getShoppingList, deleteShoppingList };
