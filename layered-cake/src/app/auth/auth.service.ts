import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthSignInResponseData, AuthSignUpResponseData } from "../shared/authentication.models";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthenticationSevice {
    constructor(private https: HttpClient) {}
    apiSignUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyARHwHvqgIHSpdFk_HipGm03MPzdDWubZM';
    apiSignIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyARHwHvqgIHSpdFk_HipGm03MPzdDWubZM';

    signUp(email: string, password: string) {
        return this.https.post<AuthSignUpResponseData>(this.apiSignUp,
            { 
              email: email,
              password: password,
              returnSecureToken: true
            })
             .pipe(catchError(error => {
                let errMsg = 'An uknown erorr has occurred';
                if(!error.error || !error.error.error) {
                    return throwError(errMsg);
                }
                switch(error.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errMsg = 'Email address is already in use';
                    case 'OPERATION_NOT_ALLOWED':
                        errMsg = 'Authentication is disabled';
                    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                        errMsg = 'Unusual activity detected. Please try again later';
                }
                return throwError(errMsg);
             }))
    }

    signIn(email: string, password: string) {
       return this.https.post<AuthSignInResponseData>(this.apiSignIn,
            {
                email: email,
                password: password,
                returnSecureToken: true
            });
    }
}