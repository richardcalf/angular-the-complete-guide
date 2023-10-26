import { createAction, props } from "@ngrx/store";
import { User } from "src/app/shared/authentication.models";

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