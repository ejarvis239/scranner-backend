
const formatRecipe = (userDocs, recipes) => {
  return recipes.map((recipe) => {
    return {
      ...recipe,
      user: userDocs.find(userDoc => userDoc.username === recipe.user)._id,
    };
  });
};

const formatShoppingList = (userDocs, recipeDocs, shoppingData) => {
  return shoppingData.map((shoppingList) => {
    return {
      ...shoppingList,
      user: userDocs.find(user => user.username === shoppingList.user)._id,
      recipes: shoppingList.recipes.map((listRecipe) => {
        return recipeDocs.find(recipeDoc => listRecipe === recipeDoc.name)._id
      }),
    };
  });
};

module.exports = { formatRecipe, formatShoppingList };
