import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/shared/authentication.models";
import { login, logout } from "./auth.actions";

export interface State {
    user: User;
}

const initialState = {
    user: null
}

export const authReducer = createReducer(
    initialState,
    on(login, (state, action) => ({
        ...state,
        user: new User(action.email, action.userId, action.token,action.expireDate)
    })),
    on(logout, (state, action) => ({
        ...state,
        user: null
    }))
)