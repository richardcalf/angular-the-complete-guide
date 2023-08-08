import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
        new Ingredient('Pears', 3)
      ];

      getIngredients() {
        return this.ingredients.slice();
      }

      addIngredient(item: Ingredient) {
        this.ingredients.push(item);
      }
}