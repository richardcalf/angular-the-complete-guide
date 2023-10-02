import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeNotSelectedComponent } from "./recipes/recipe-not-selected/recipe-not-selected.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthGaurd } from "./auth/auth.gaurd";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent, canActivate: [AuthGaurd], children: [
        { path: '', component: RecipeNotSelectedComponent },
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
        { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
    ] },
    { path: 'shoppinglist', component: ShoppingListComponent },
    { path: 'auth', component: AuthComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}