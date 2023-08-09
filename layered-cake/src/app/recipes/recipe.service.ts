import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Tamiya Monster Beetle!', 
               'Build kit for the timeless Monster Beetle',
               'https://i.ytimg.com/vi/1DFhzJhrLzY/maxresdefault.jpg',
               [ 
                 new Ingredient('Tamiya Shock Towers',4), 
                 new Ingredient('Tamiya Bush Bearings', 3) 
               ]),
    new Recipe('Kyosho Inferno', 
               'Master build for the Kyosho Inferno!',
               'https://rc.kyosho.com/media/wysiwyg/kyosho/sp_page/inferno_neo30/action01.jpg',
               [ 
                 new Ingredient('Kyosho Turn Buckles',12),
                 new Ingredient('Kyosho Oil Shocks',4) 
               ])
  ];

  getRecipes() {
    return this.recipes.slice();
  }   
}
