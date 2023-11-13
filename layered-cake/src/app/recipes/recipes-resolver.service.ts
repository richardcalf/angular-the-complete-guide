import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import { getRecipes, setRecipes } from '../recipes/store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<{recipes: Recipe[]}> {
    constructor(
                private dataStore: DataStorageService, 
                private recipeService: RecipeService,
                private store: Store<fromApp.AppState>,
                private actions$: Actions
                ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const recipes = this.recipeService.getRecipes();
        // return recipes.length === 0 ? this.dataStore.fetchRecipes() : recipes;

        this.store.dispatch(getRecipes());
        return this.actions$.pipe(
            ofType(setRecipes),
             take(1)
        );
    }
}