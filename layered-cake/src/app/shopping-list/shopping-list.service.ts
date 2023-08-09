import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Tamiya Wheel Hubs', 4),
        new Ingredient('Kyosho Front Drive Shaft', 2),
        new Ingredient('Kyosho Sway Bars', 3)
      ];

      ingredientsChanged = new EventEmitter<Ingredient[]>();

      getIngredients() {
        return this.ingredients.slice();
      }

      private notifyChange() {
        this.ingredientsChanged.emit(this.ingredients.slice());
      }

      addIngredient(item: Ingredient) {
        this.ingredients.push(item);
        this.notifyChange();
      }

      addIngredients(items: Ingredient[]) {
        this.ingredients.push(...items);
        this.notifyChange();
      }
}