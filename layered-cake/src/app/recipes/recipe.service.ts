import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Goulash Recipe', 
               'Enjoy the Goulash Stew',
               'https://www.allrecipes.com/thmb/Q9CsPT8f6h5UydohsA5VILBFlrQ=/1500x750/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/2400-240708-broccoli-and-chicken-stir-fry-3x4-186-b7f290a400134ae9910f2e67ff50d9f2.jpg',
               [ 
                 new Ingredient('Chicken hunks',45), 
                 new Ingredient('Broccoli', 71) 
               ]),
    new Recipe('Chorizo Bake Recipe', 
               'Enjoy the Chorizo Bake',
               'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/gnocchi-1d16725.jpg',
               [ 
                 new Ingredient('Corn',12),
                 new Ingredient('Sauce',100) 
               ])
  ];

  getRecipes() {
    return this.recipes.slice();
  }   
}
