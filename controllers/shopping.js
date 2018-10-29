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
  const {user_id} = req.params;
  ShoppingList.findByIdAndUpdate({_id: user_id})
  .then(() => {
    res.status(200).send({ msg: "success" })
  })
  .catch(next)

}


module.exports = { getShoppingList, deleteShoppingList };
