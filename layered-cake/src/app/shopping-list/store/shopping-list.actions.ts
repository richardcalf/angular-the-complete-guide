import { createAction, props } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const addIngredient = createAction(
    '[Shopping] AddIngredient',
    props<{ingredient: Ingredient}>()
);

export const addIngredients = createAction(
    '[Shopping] AddIngredients',
    props<{ingredients: Ingredient[]}>()
);

export const updateIngredient = createAction(
    '[Shopping] UpdateIngredient',
    props<{ ingredient: Ingredient }>()
);

export const removeIngredient = createAction(
    '[Shopping] RemoveIngredient',
);

export const startEdit = createAction(
    '[Shopping] StartEdit',
    props<{index: number}>()
);

export const stopEdit = createAction(
    '[Shopping] StopEdit'
);
