import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Params } from 'express-serve-static-core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {}

  recipe: Recipe;

  ngOnInit() {
    let recipeId = +this.route.snapshot.params['id'];
    this.recipe = this.recipeService.getRecipe(recipeId);

    this.route.params.subscribe(
      (p: Params) => {
        this.recipe = this.recipeService.getRecipe(+p['id']);
      }
    )
  }

  onRecipeToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
