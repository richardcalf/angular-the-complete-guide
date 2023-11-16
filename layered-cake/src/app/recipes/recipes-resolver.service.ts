import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import { getRecipes, setRecipes } from '../recipes/store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<{recipes: Recipe[]}> {
    constructor(
                private store: Store<fromApp.AppState>,
                private actions$: Actions
                ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('recipes').pipe(
            take(1),
            map(recipesState => {
            return recipesState.recipes;
        }),
        switchMap(recipes => {
            if(recipes.length === 0) {
                this.store.dispatch(getRecipes());
                return this.actions$.pipe(
                    ofType(setRecipes),
                     take(1)
                );
            } else {
                return of({recipes: recipes} )
            }
        })
      );
    }
}