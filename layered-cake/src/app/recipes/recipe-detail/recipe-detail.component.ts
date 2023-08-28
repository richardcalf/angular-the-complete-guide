import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from 'express-serve-static-core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {}

  recipe: Recipe;
  index: number;

  ngOnInit() {
    // let recipeId = +this.route.snapshot.params['id'];
    // this.recipe = this.recipeService.getRecipe(recipeId);

    this.route.params.subscribe(
      (p: Params) => {
        this.index = +p['id'];
        this.recipe = this.recipeService.getRecipe(this.index);
      }
    );
  }

  onRecipeToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    //all three of these navigate methods do the same thing. to practice
    // this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['recipes', this.index,  'edit']);
    //or..
    this.router.navigate(['../', this.index, 'edit' ], {relativeTo: this.route});
  }
}
