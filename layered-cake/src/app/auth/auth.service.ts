import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthResponseData } from "../shared/authentication.models";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthenticationSevice {
    constructor(private https: HttpClient) {}
    apiSignUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyARHwHvqgIHSpdFk_HipGm03MPzdDWubZM';
    apiSignIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyARHwHvqgIHSpdFk_HipGm03MPzdDWubZM';

    signUp(email: string, password: string) {
        return this.https.post<AuthResponseData>(this.apiSignUp,
            { 
              email: email,
              password: password,
              returnSecureToken: true
            })
             .pipe(catchError(this.handleError));
    }

    signIn(email: string, password: string) {
       return this.https.post<AuthResponseData>(this.apiSignIn,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
             .pipe(catchError(this.handleError));
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