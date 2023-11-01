import { Actions, ofType, createEffect } from '@ngrx/effects';
import { startLogin, authenticateSuccess, authenticateFail, signUpStart } from './auth.actions'
import { catchError, map, switchMap, tap  } from 'rxjs/operators';
import { AuthResponseData } from 'src/app/shared/authentication.models';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Injectable } from '@angular/core';
import { of } from 'rxjs'
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    constructor(private https: HttpClient, private actions$: Actions,
                private router: Router) {}
    apiSignIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey;

    authSignup = createEffect(() => 
    this.actions$.pipe(
      ofType(signUpStart),
    ));

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
              return authenticateSuccess({
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
                  authenticateFail({error: errorMessage})
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
                authenticateFail({error: errorMessage})
              );
            })
          );
      })
    ));

    authSuccess = createEffect(() => 
      this.actions$.pipe(
        ofType(authenticateSuccess),
        tap(() => {
          this.router.navigate(['/']);
        }),   
      ),
      { dispatch : false }
    )
}