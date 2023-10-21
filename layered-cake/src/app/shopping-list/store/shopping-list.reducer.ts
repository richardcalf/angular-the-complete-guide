import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import { addIngredient, addIngredients } from "./shopping-list.actions";

const initialState = {
    ingredients: []
};

export const shoppingListReducer = createReducer(
    initialState,
    on(addIngredient, (state, action) => ({
         ...state,
         ingredients: [...state.ingredients, action.ingredient]
    })),
    on(addIngredients, (state, action) => ({
        ...state,
        ingredients: [...state.ingredients, ...action.ingredients]
    }))
);
