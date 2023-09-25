import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private https: HttpClient, private recipeService: RecipeService) {}
    apiEndpoint = 'https://ng-layered-rc-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json';

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.https.put(this.apiEndpoint,recipes)
        .subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes() {
        this.https.get<Recipe[]>(this.apiEndpoint)
        .subscribe(recipes => {
            this.recipeService.setRecipes(recipes);
        });
    }
}