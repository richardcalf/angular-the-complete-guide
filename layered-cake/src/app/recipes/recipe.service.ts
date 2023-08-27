import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  constructor(private shoppingService: ShoppingListService) {}

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
               ]),
    new Recipe('Traxxas E-Revo 2.0', 
               'Power. Strength. Speed.',
               'https://www.modelsport.co.uk/_images/products/800/tra86086-4blue-5.jpg',
               [ 
                 new Ingredient('Traxxas Shock Towers',2),
                 new Ingredient('Traxxas Speed Controller',1) 
               ]),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.slice()[id];
  }
  
  addIngredientsToShoppingList(items: Ingredient[]) {
     this.shoppingService.addIngredients(items);
  }
}
