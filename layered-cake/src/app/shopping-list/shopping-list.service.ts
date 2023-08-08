import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
        new Ingredient('Pears', 3)
      ];

      ingredientsChanged = new EventEmitter<Ingredient[]>();

      getIngredients() {
        return this.ingredients.slice();
      }

      addIngredient(item: Ingredient) {
        this.ingredients.push(item);
        this.ingredientsChanged.emit(this.ingredients.slice());
      }
}