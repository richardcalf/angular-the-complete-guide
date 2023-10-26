import { createReducer } from "@ngrx/store";
import { User } from "src/app/shared/authentication.models";

export interface State {
    user: User;
}

const initialState = {
    user: null
}

export const authReducer = createReducer(
    initialState,
)