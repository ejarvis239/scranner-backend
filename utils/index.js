const generateRecipeRefObj = (recipeDocs, recipes) => {
  return recipes.reduce((acc, recipe, i) => {
    acc[recipe.name] = recipeDocs[i]._id;
    return acc;
  }, {});
};


const formatRecipe = (userDocs, recipes) => {
  return recipes.map((recipe) => {
    return {
      ...recipe,
      user: userDocs.find(userDoc => userDoc.username === recipe.user)._id,
    };
  });
};

const formatShoppingList = (userDocs, recipeDocs, shoppingData, recipeRefObj) => {
  return shoppingData.map((shoppingList) => {
    return {
      ...shoppingList,
      user: userDocs.find(user => user.username === shoppingList.user)._id,
      recipes: shoppingList.recipes.map((listRecipe) => {
        return recipeRefObj[listRecipe];
      }),
    };
  });
};

const buildBasket = (newRecipe, recipeList, basketIngredients) => {
  const updatedRecipe = [...recipeList, newRecipe._id]

  const updatedIngredients = newRecipe.ingredients.reduce((acc, newIngredient) => {
    const index = acc.findIndex(element => element.name === newIngredient.name);
    if (index !== -1) acc[index].amount += Number(newIngredient.amount);
    else acc = [...acc, {name: newIngredient.name, amount: newIngredient.amount, units: newIngredient.units}];
    return acc
  }, basketIngredients);

  return [updatedRecipe, updatedIngredients]
}


module.exports = { formatRecipe, formatShoppingList, generateRecipeRefObj, buildBasket };
