import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import { deleteRecipe } from '../store/recipe.actions'
import { addIngredients, addIngredient } from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css','../../app.component.css']
})
export class RecipeDetailComponent implements OnInit {
  constructor(
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
    this.store.dispatch(addIngredients({ingredients: this.recipe.ingredients}));
  }

  onRecipeItemToShoppingList(i: number) {
    this.store.dispatch(addIngredient({ingredient: this.recipe.ingredients[i]}))
  }

  onEditRecipe() {
    //all three of these navigate methods do the same thing. to practice
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['recipes', this.index,  'edit']);
    //or..
    // this.router.navigate(['../', this.index, 'edit' ], {relativeTo: this.route});
  }

  onDeleteRecipe() {
      this.store.dispatch(deleteRecipe({ index: this.index }));
      this.router.navigate(['../']);
  }

  getClassOpen() {
    if(this.isOpen) {
      return 'btn-group open';
    }
    return 'btn-group';
  }
}
