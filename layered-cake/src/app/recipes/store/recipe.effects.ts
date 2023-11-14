import { Actions, ofType, createEffect } from '@ngrx/effects';
import { getRecipes, setRecipes } from './recipe.actions';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from "../recipe.model";
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {
    constructor(private actions$: Actions, private https: HttpClient) {}
    apiEndpoint = 'https://ng-layered-rc-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json';

    fetchRecipes = createEffect(() =>
    this.actions$.pipe(
        ofType(getRecipes),
        switchMap(() => {
            return this.https.get<Recipe[]>(this.apiEndpoint);
        }),
        map(recipes => {
            return recipes.map(recipe => {
                return {  
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : [] 
                };
            });
        }),
        map(recipes => {
            return setRecipes( {recipes: recipes } );
        })
    ))
}
