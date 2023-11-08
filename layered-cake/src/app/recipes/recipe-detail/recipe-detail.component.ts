import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from 'express-serve-static-core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css','../../app.component.css']
})
export class RecipeDetailComponent implements OnInit {
  constructor(
              private recipeService: RecipeService, 
              private route: ActivatedRoute, 
              private router: Router,
              private store: Store<fromApp.AppState>

              ) {}

  recipe: Recipe;
  index: number;
  isOpen = false;

  ngOnInit() {
    // let recipeId = +this.route.snapshot.params['id'];
    // this.recipe = this.recipeService.getRecipe(recipeId);

    this.route.params.pipe(map(params => {
      return +params['id'];
    }), switchMap(id => {
      this.index = id;
      return this.store.select('recipes');
    }),
    map(recipesState => {
      return recipesState.recipes.find((recipe, index) => {
        return index === this.index;
      });
    })
    )
    .subscribe(recipe => {
          this.recipe = recipe;
        });
  }

  onRecipeToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onRecipeItemToShoppingList(i: number) {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients[i]);
  }

  onEditRecipe() {
    //all three of these navigate methods do the same thing. to practice
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['recipes', this.index,  'edit']);
    //or..
    // this.router.navigate(['../', this.index, 'edit' ], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    // if(confirm("Delete "+this.recipe.name+"?")) {
      this.recipeService.removeRecipe(this.index);
      this.router.navigate(['../']);
    // }
  }

  getClassOpen() {
    if(this.isOpen) {
      return 'btn-group open';
    }
    return 'btn-group';
  }
}
