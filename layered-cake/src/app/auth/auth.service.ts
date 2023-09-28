import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthSignInResponseData, AuthSignUpResponseData } from "../shared/authentication.models";

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
            });
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