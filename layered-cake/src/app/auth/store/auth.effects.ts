import { Actions, ofType, createEffect } from '@ngrx/effects';
// import * as AuthActions from './auth.actions'
import { startLogin, login, loginFail } from './auth.actions'
import { catchError, map, switchMap  } from 'rxjs/operators';
import { AuthResponseData } from 'src/app/shared/authentication.models';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Injectable } from '@angular/core';
import { of } from 'rxjs'

@Injectable()
export class AuthEffects {
    constructor(private https: HttpClient,private actions$: Actions) {}
    apiSignIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey;

    authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(startLogin),
      switchMap((authData: {email: string, password: string}) => {
        return this.https
          .post<AuthResponseData>(
            this.apiSignIn,
            {
              email: authData.email,
              password: authData.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => {
              const expirationDate = new Date(
                new Date().getTime() + +resData.expiresIn * 1000
              );
              return login({
                email: resData.email,
                userId: resData.localId,
                token: resData.idToken,
                expireDate: expirationDate,
              });
            }),
            catchError((errorRes) => {
              let errorMessage = 'An unknown error occurred!';
              if (!errorRes.error || !errorRes.error.error) {
                return of(
                   loginFail({error: errorMessage})
                );
              }
              switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                      errorMessage = 'Email address is already in use';
                        break;
                    case 'OPERATION_NOT_ALLOWED':
                      errorMessage = 'Authentication is disabled';
                        break;
                    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                      errorMessage = 'Unusual activity detected. Please try again later';
                        break;
                    case 'INVALID_LOGIN_CREDENTIALS':
                      errorMessage = 'Invalid login details';
                        break;
                    case 'USER_DISABLED':
                      errorMessage = 'User account is inactive';
                         break;
                    default:
                      errorMessage = 'Login is not available';
                        break;
              }
              return of(
                loginFail({error: errorMessage})
              );
            })
          );
      })
    ));
    
}