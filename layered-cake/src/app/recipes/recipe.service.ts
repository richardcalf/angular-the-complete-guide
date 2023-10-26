import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";
import { addIngredients, addIngredient } from "../shopping-list/store/shopping-list.actions";
import * as fromApp from '../store/app.reducer'


@Injectable()
export class RecipeService {
  constructor(private store: Store<fromApp.AppState>) {}

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
    this.store.dispatch(addIngredients({ ingredients: items }));
  }

  addIngredientToShoppingList(item: Ingredient) {
    this.store.dispatch(addIngredient({ ingredient: item }));
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
