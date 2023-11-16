import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import { addIngredient, addIngredients, updateIngredient, removeIngredient, startEdit, stopEdit } from "./shopping-list.actions";

export interface State {
    ingredients: Ingredient[],
    editingIngredient: Ingredient,
    itemIndex: number
}

// export interface AppState {
//     shoppingList: State;
// }

const initialState: State = {
    ingredients: [],
    editingIngredient: null,
    itemIndex: -1
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
        const ingredient = state.ingredients[state.itemIndex];
        const updatedIngredient = {
            ...ingredient,
            ...action.ingredient
        };
        const updatedIngredients = [...state.ingredients];
        updatedIngredients[state.itemIndex] = updatedIngredient;

        return {
            ...state,
            ingredients: updatedIngredients,
            itemIndex: state.itemIndex,
            editingIngredient: { ...updatedIngredients[state.itemIndex] }
        };
    }),
    on(removeIngredient, (state, action) => ({
        ...state,
        ingredients: state.ingredients.filter((ig, i) => {
            return i !== state.itemIndex;
        }),
        itemIndex: -1,
        editingIngredient: null
    })
    ),
    on(startEdit, (state, action) => ({
        ...state,
        itemIndex: action.index,
        editingIngredient: { ...state.ingredients[action.index] }
    })),
    on(stopEdit, (state, action) => ({
        ...state,
        editingIngredient: null,
        itemIndex: -1
    }))
);
