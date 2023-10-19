import {  createAction, props } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const addIngredient = createAction(
    '[Shopping] AddIngredient',
    props<{ingredient: Ingredient}>()
);
