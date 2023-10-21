import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import { addIngredient, addIngredients, updateIngredient, removeIngredient } from "./shopping-list.actions";

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
    })),
    on(updateIngredient, (state, action) => {
        const ingredient = state.ingredients[action.index];
        const updatedIngredient = {
            ...ingredient,
            ...action.ingredient
        };
        const updatedIngredients = [...state.ingredients];
        updatedIngredients[action.index] = updatedIngredient;

        return {
            ...state,
            ingredients: updatedIngredients
        };
    }),
    on(removeIngredient, (state, action) => ({
        ...state,
        ingredients: state.ingredients.filter((ig, i) => {
            return i !== action.index
        })
    })
    )
);
