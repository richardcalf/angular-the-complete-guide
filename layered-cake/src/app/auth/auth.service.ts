import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthResponseData } from "../shared/authentication.models";
import { catchError, tap } from "rxjs/operators";
import { Subject, BehaviorSubject, throwError } from "rxjs";
import { User } from "../shared/authentication.models";

@Injectable({providedIn: 'root'})
export class AuthenticationSevice {
    constructor(private https: HttpClient) {}
    apiSignUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyARHwHvqgIHSpdFk_HipGm03MPzdDWubZM';
    apiSignIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyARHwHvqgIHSpdFk_HipGm03MPzdDWubZM';
    user = new BehaviorSubject<User>(null);

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

    private handleAuthentication(
        email: string, 
        userId: string, 
        token: string, 
        expiresIn: number
        ) {
        const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expireDate);
        this.user.next(user);
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