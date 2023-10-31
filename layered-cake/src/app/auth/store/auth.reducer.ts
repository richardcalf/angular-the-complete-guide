import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/shared/authentication.models";
import { login, loginFail, logout, startLogin } from "./auth.actions";

export interface State {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false
}

export const authReducer = createReducer(
    initialState,
    on(login, (state, action) => ({
        ...state,
        authError: null,
        user: new User(action.email, action.userId, action.token,action.expireDate),
        loading: false
    })),
    on(logout, (state, action) => ({
        ...state,
        user: null
    })),
    on(startLogin, (state, action) => ({
        ...state,
        authError: null,
        loading: true
    })),
    on(loginFail, (state, action) => ({
        ...state,
        user: null,
        authError: action.error,
        loading: false
    }) )
)