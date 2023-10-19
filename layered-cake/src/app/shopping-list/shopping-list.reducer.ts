import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "../shared/ingredient.model";

const initialState = {
    
};

export const shoppingListReducer = createReducer(
    initialState,
    on('ADD_INGREDIENT', (state, action) => ({
         ...state,
         ingredients: [...state.ingredients, action.ingredient]
    })),
);
