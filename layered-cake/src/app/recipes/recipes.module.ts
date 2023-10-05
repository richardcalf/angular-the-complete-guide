import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { RecipesComponent } from "./recipes.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeNotSelectedComponent } from "./recipe-not-selected/recipe-not-selected.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeNotSelectedComponent,
        RecipeEditComponent,
    ],
    imports: [
        RouterModule, 
        ReactiveFormsModule, 
        RecipesRoutingModule,
        SharedModule
    ]
})
export class RecipesModule {}