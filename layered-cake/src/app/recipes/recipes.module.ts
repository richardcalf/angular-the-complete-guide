import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { RecipesComponent } from "./recipes.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeNotSelectedComponent } from "./recipe-not-selected/recipe-not-selected.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeNotSelectedComponent,
        RecipeEditComponent,
    ],
    imports: [RouterModule, CommonModule, ReactiveFormsModule],
    exports: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeNotSelectedComponent,
        RecipeEditComponent,
    ]
})
export class RecipesModule {}