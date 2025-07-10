"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
let totalCakes = [];
const ingredientChecker = (recipeItem, availableItem) => {
    if (!recipeItem)
        return;
    if (recipeItem && !availableItem)
        return totalCakes.push(0);
    if (recipeItem && availableItem) {
        return totalCakes.push(Math.floor(availableItem / recipeItem));
    }
};
const cakes = (recipe, available) => {
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
console.log(cakes(data_1.recipe1, data_1.available1));
console.log(cakes(data_1.recipe2, data_1.available2));
console.log(cakes(data_1.recipe3, data_1.available3));
console.log(cakes(data_1.recipe4, data_1.available4));
console.log(cakes(data_1.recipe5, data_1.available5));
