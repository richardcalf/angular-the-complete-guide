import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthResponseData {
    idToken: string
    email: string
    refreshToken: string
    expiresIn: string
    localId: string
}

@Injectable({providedIn: 'root'})
export class AuthenticationSevice {
    constructor(private https: HttpClient) {}
    apiEndPoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyARHwHvqgIHSpdFk_HipGm03MPzdDWubZM';

    signup(email: string, password: string) {
        return this.https.post<AuthResponseData>(this.apiEndPoint,
            { email: email,
              password: password,
              returnSecureToken: true
            });
    }
}