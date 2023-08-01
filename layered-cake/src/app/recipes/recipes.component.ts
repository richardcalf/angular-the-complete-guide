import { Component } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
    recipe: Recipe;

  oneOfTheItemsInMyListWasClicked(recipe: Recipe) {
    console.log('oneOfTheItemsInMyListWasClicked ' + recipe.name);
    this.recipe = recipe;
  }

}
