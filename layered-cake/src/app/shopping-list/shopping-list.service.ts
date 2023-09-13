import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Tamiya Wheel Hubs', 4),
        new Ingredient('Kyosho Front Drive Shaft', 2),
        new Ingredient('Kyosho Sway Bars', 3)
      ];

      ingredientsChanged = new Subject<Ingredient[]>();
      editModeInvoked = new Subject<number>();

      getIngredients() {
        return this.ingredients.slice();
      }

      getIngredient(i: number): Ingredient {
        return this.ingredients[i];
      }

      private notifyChange() {
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      addIngredient(item: Ingredient) {
        this.ingredients.push(item);
        this.notifyChange();
      }

      updateIngredient(i: number, item: Ingredient) {
        this.ingredients[i] = item;
        this.notifyChange();
      }

      removeIngredient(i: number) {
        this.ingredients.splice(i,1);
        this.notifyChange();
      }

      addIngredients(items: Ingredient[]) {
        this.ingredients.push(...items);
        this.notifyChange();
      }
}