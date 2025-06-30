import {
  recipe1,
  recipe2,
  recipe3,
  recipe4,
  recipe5,
  available1,
  available2,
  available3,
  available4,
  available5,
} from './data';

type Ingredients = {
  flour?: number;
  sugar?: number;
  eggs?: number;
  milk?: number;
  apples?: number;
  oil?: number;
  cocoa?: number;
};

let totalCakes: number[] = [];

const ingredientChecker = (
  recipeItem: number | undefined,
  availableItem: number | undefined,
) => {
  if (!recipeItem) return;
  if (recipeItem && !availableItem) return totalCakes.push(0);
  if (recipeItem && availableItem) {
    return totalCakes.push(Math.floor(availableItem / recipeItem));
  }
};

const cakes = (recipe: Ingredients, available: Ingredients): number => {
  totalCakes = [];

  ingredientChecker(recipe.flour, available.flour);
  ingredientChecker(recipe.sugar, available.sugar);
  ingredientChecker(recipe.eggs, available.eggs);
  ingredientChecker(recipe.milk, available.milk);
  ingredientChecker(recipe.apples, available.apples);
  ingredientChecker(recipe.oil, available.flour);
  ingredientChecker(recipe.cocoa, available.cocoa);

  return totalCakes.sort((a, b) => b - a).slice(totalCakes.length - 1)[0];
};

console.log(cakes(recipe1, available1));
console.log(cakes(recipe2, available2));
console.log(cakes(recipe3, available3));
console.log(cakes(recipe4, available4));
console.log(cakes(recipe5, available5));
