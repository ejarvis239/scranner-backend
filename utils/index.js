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

const buildBasket = (newRecipe, recipeList, basketIngredients, update) => {
    const updatedRecipe = update === 'add'
    ? [...recipeList, newRecipe._id]
    : removeRecipe(recipeList, newRecipe._id);

    const updatedIngredients = newRecipe.ingredients.reduce((acc, newIngredient) => {
      if (update !== "add" && update !== "remove") throw {status: 400};
      const index = acc.findIndex(element => element.name === newIngredient.name);
      if (index !== -1 && update === 'add') acc[index].amount += Number(newIngredient.amount);
      else if (index !== -1 && update === 'remove') acc[index].amount -= Number(newIngredient.amount);
      else acc = [...acc, { name: newIngredient.name, amount: newIngredient.amount, units: newIngredient.units }];
      return acc
    }, basketIngredients);
  return [updatedRecipe, updatedIngredients]
}

const removeRecipe = (recipeList, recipeId) => {
  const index = recipeList.findIndex(recipe => recipe.toString() === recipeId.toString());
  recipeList.splice(index, 1);
  return recipeList;
}


module.exports = { formatRecipe, formatShoppingList, generateRecipeRefObj, buildBasket};
