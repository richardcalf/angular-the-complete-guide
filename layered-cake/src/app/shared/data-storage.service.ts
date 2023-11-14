import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import { setRecipes } from '../recipes/store/recipe.actions'


@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private https: HttpClient, 
         private recipeService: RecipeService,
         private store: Store<fromApp.AppState>
        ) {}
    apiEndpoint = 'https://ng-layered-rc-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json';

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.https.put(this.apiEndpoint,recipes)
        .subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes() {
        return this.https.get<Recipe[]>(this.apiEndpoint)
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return {  ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }          
            })
        }),
        tap(recipes => {
            this.store.dispatch(setRecipes({recipes: recipes}));
        })
        )
    }
}
