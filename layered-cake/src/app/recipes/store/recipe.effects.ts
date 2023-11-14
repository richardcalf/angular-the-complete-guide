import { Actions, ofType, createEffect, EffectConfig } from '@ngrx/effects';
import { getRecipes, setRecipes, storeRecipes } from './recipe.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from "../recipe.model";
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Observable } from 'rxjs';

@Injectable()
export class RecipeEffects {
    constructor(
                private actions$: Actions, 
                private https: HttpClient,
                private store: Store<fromApp.AppState>
                ) {}
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
    ));

    storeRecipes = createEffect((): Observable<Recipe[]> => {
        return this.actions$.pipe(
            ofType(storeRecipes),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([actionData, recipesState]) => {
                return this.https.put<Recipe[]>(this.apiEndpoint, recipesState.recipes)
            })
        )
    },
    { dispatch : false }
    )
}
