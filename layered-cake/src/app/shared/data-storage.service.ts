import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private https: HttpClient, private recipeService: RecipeService) {}
    apiEndpoint = 'https://ng-layered-rc-default-rtdb.asia-southeast1.firebasedatabase.app/';

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.https.put(this.apiEndpoint+'recipes.json',recipes)
        .subscribe(response => {
            console.log(response);
        })
    }
}