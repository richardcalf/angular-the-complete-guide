import { createAction, props } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const setRecipes = createAction(
    '[Recipes] Set Recipes',
    props<{recipes: Recipe[]}>()
)

export const getRecipes = createAction(
    '[Recipes] Get Recipes'
)

export const addRecipe = createAction(
    '[Recipe] Add Recipe',
    props<{recipe: Recipe}>()
)

export const updateRecipe = createAction(
    '[Recipe] Update Recipe',
    props<{index: number, recipe: Recipe}>()
)

export const deleteRecipe = createAction(
    '[Recipe] Delete Recipe',
    props<{index: number}>()
)

export const storeRecipes = createAction(
    '[Recipes] Store Recipes'
)
