import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  constructor(private shoppingService: ShoppingListService) {}

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Tamiya Monster Beetle', 
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
    new Recipe('Traxxas Stampede', 
               'The Definitive Monster Truck',
               'https://m.traxxas.com/sites/default/files/36054-1-Stampede-Orange-Side-RtoL-0771@1x.jpg',
               [ 
                 new Ingredient('Brushless VXL Motor',2),
                 new Ingredient('19 T Pinion Gear',1),
                 new Ingredient('13000 mAh 2s Lipo',1)
               ]),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.slice()[id];
  }

  private notifyChange() {
    this.recipesChanged.next(this.recipes.slice());
  }
  
  addIngredientsToShoppingList(items: Ingredient[]) {
     this.shoppingService.addIngredients(items);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.notifyChange();
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.notifyChange();
  }

  removeRecipe(index: number) {
    this.recipes.splice(index,1);
    this.notifyChange();
  }
}
