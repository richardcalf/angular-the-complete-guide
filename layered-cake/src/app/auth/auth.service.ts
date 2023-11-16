import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store'
import * as fromApp from '../store/app.reducer'
import { logout } from "./store/auth.actions";

@Injectable({providedIn: 'root'})
export class AuthenticationSevice {
    constructor(private store: Store<fromApp.AppState>) {}
        
    private tokenExpirationTimer: any;

    setLogoutTimer(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(logout());
        }, expirationDuration);
    }

    clearLogoutTimer() {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }
}