import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Recipe } from "./recipe.model";

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private dataStore: DataStorageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.dataStore.fetchRecipes();
    }
}