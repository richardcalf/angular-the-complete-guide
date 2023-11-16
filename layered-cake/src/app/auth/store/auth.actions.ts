import { createAction, props } from "@ngrx/store";

export const startLogin = createAction(
    '[Auth] Start Login',
    props<{email: string, password: string}>()
)

export const authenticateSuccess = createAction(
    '[Auth] Login',
    props<{
        email: string;
        userId: string;
        token: string;
        expireDate: Date;
        redirect: boolean;
    }>()
)

export const logout = createAction(
    '[Auth] Logout',
)

export const authenticateFail = createAction(
    '[Auth] Login Fail',
    props<{error: string}>()
)

export const signUpStart = createAction(
    '[Auth] SignUp Start',
    props<{email: string;
           password: string}>()
)

export const handleError = createAction(
    '[Auth] Handle Error'
)

export const autoLogin = createAction(
    '[Auth] Auto Login'
)
