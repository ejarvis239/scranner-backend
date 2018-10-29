const Recipe = require('../models/Recipe');

const getRecipesByUser = (req, res, next) => {
  Recipe.find({ user: req.params.user_id })
    .populate('user')
    .then((recipes) => {
      res.status(200).send({ recipes });
    })
    .catch(next);
};

const addRecipe = (req, res, next) => {
  const {user_id} = req.params;
  const newRecipe = req.body;
  newRecipe.user = user_id;
  Recipe.create(newRecipe)
  .then(recipe => {
    return Recipe.findById(recipe._id)
    .populate('user')
  })
  .then(recipe => {
    res.status(201).send({recipe})
  })
  .catch(next)
};

const deleteRecipe = (req, res, next) => {
  const {recipe_id} = req.params
  Recipe.findByIdAndRemove({_id: recipe_id})
  .then(() => {
    res.status(200).send({ msg: "Recipe successfully deleted!" })
  })
  .catch(next)

}

module.exports = { getRecipesByUser, addRecipe, deleteRecipe };
