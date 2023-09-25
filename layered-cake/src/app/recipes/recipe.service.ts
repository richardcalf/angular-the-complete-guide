import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  constructor(private shoppingService: ShoppingListService) {}

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.notifyChange();
  }

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

  addIngredientToShoppingList(item: Ingredient) {
    this.shoppingService.addIngredient(item);
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
