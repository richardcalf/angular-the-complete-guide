import { createAction, props } from "@ngrx/store";

export const startLogin = createAction(
    '[Auth] Start Login',
    props<{email: string, password: string}>()
)

export const login = createAction(
    '[Auth] Login',
    props<{
        email: string;
        userId: string;
        token: string;
        expireDate: Date;
    }>()
)

export const logout = createAction(
    '[Auth] Logout',
)

export const loginFail = createAction(
    '[Auth] Login Fail',
    props<{error: string}>()
)