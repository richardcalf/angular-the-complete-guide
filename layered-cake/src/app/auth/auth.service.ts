import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthResponseData } from "../shared/authentication.models";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";
import { User } from "../shared/authentication.models";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Store } from '@ngrx/store'
import * as fromApp from '../store/app.reducer'
import { authenticateSuccess, logout } from "./store/auth.actions";

@Injectable({providedIn: 'root'})
export class AuthenticationSevice {
    constructor(private https: HttpClient, private router: Router, private store: Store<fromApp.AppState>) {}
    apiSignUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey;
    apiSignIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey;
    private tokenExpirationTimer: any;

    signUp(email: string, password: string) {
        return this.https.post<AuthResponseData>(this.apiSignUp,
            { 
              email: email,
              password: password,
              returnSecureToken: true
            })
             .pipe(catchError(this.handleError),
             tap(r => {
                this.handleAuthentication(
                    r.email,
                    r.localId,
                    r.idToken,
                    +r.expiresIn
                );
             })
             );
    }

    signIn(email: string, password: string) {
       return this.https.post<AuthResponseData>(this.apiSignIn,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
             .pipe(catchError(this.handleError),
             tap(r => {
                this.handleAuthentication(
                    r.email,
                    r.localId,
                    r.idToken,
                    +r.expiresIn
                );
             })
        );
    }

    signOut() {
        this.store.dispatch(logout());
        localStorage.removeItem('userData');
        // this.router.navigate(['/auth']);
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoSignIn() {
        const userData:{
             email: string,
             id: string,
             _token: string,
             _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
            this.store.dispatch(authenticateSuccess({
                email: loadedUser.email,
                userId: loadedUser.id,
                token: loadedUser.token,
                expireDate: new Date(userData._tokenExpirationDate)
            })
            );
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoSignOut(expirationDuration);
        }
    }

    autoSignOut(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.signOut();
        }, expirationDuration);
    }

    private handleAuthentication(
        email: string, 
        userId: string, 
        token: string, 
        expiresIn: number
        ) {
        const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expireDate);
        this.store.dispatch(authenticateSuccess({email: email, userId: userId, token: token,expireDate: expireDate}))
        this.autoSignOut(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(error: HttpErrorResponse) {
        let errMsg = 'An uknown erorr has occurred';
                if(!error.error || !error.error.error) {
                    return throwError(errMsg);
                }
                console.log('here is the error msg:'+'|'+error.error.error.message+'|');
                switch(error.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errMsg = 'Email address is already in use';
                        break;
                    case 'OPERATION_NOT_ALLOWED':
                        errMsg = 'Authentication is disabled';
                        break;
                    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                        errMsg = 'Unusual activity detected. Please try again later';
                        break;
                    case 'INVALID_LOGIN_CREDENTIALS':
                        errMsg = 'Invalid login details';
                        break;
                    case 'USER_DISABLED':
                         errMsg = 'User account is inactive';
                         break;
                    default:
                        errMsg = 'Login is not available';
                        break;

                }
                return throwError(errMsg);
             }  
}