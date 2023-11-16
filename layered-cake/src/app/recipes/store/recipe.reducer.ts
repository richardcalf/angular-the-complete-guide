import { createReducer, on } from "@ngrx/store";
import { Recipe } from "../recipe.model";
import { setRecipes, addRecipe, updateRecipe, deleteRecipe } from './recipe.actions';

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: []
}

export const recipeReducer = createReducer(
    initialState,
    on(setRecipes, (state, action) => ({
        ...state,
        recipes: [...action.recipes]
    })),
    on(addRecipe, (state, action) => ({
        ...state,
        recipes: [...state.recipes, action.recipe]
    })),
    on(updateRecipe, (state, action) => {
        const updatedRecipe = {  
            ...state.recipes[action.index],
            ...action.recipe
         };

         const updatedRecipes = [...state.recipes];
         updatedRecipes[action.index] = updatedRecipe;

         return {
            ...state,
            recipes: updatedRecipes
         }
    }),
    on(deleteRecipe, (state, action) => ({
        ...state,
        recipes: state.recipes.filter( (recipe, index) => {
            return index !== action.index;
        })
    }))
)
