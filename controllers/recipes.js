const Recipe = require('../models/Recipe');

const getRecipesByUser = (req, res, next) => {
  Recipe.find({ user: req.params.user_id })
    .populate('user')
    .then((recipes) => {
      res.status(200).send({ recipes });
    })
    .catch(next);
};

module.exports = { getRecipesByUser };
