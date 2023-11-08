import { Actions, ofType, createEffect } from '@ngrx/effects';
import { startLogin, authenticateSuccess, authenticateFail, signUpStart, logout, autoLogin } from './auth.actions'
import { catchError, map, switchMap, tap  } from 'rxjs/operators';
import { AuthResponseData, User } from 'src/app/shared/authentication.models';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Injectable } from '@angular/core';
import { of } from 'rxjs'
import { Router } from '@angular/router';
import { AuthenticationSevice } from '../auth.service';

@Injectable()
export class AuthEffects {
    constructor(private https: HttpClient, private actions$: Actions,
                private router: Router,
                private authService: AuthenticationSevice) {}
    apiSignIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey;
    apiSignUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey;

    readonly handleAuthentication = (expiresIn: number, email: string, userId: string, token: string) => {
      const expirationDate = new Date(
        new Date().getTime() + expiresIn * 1000
      );
      const user = new User(email,userId, token, expirationDate);
      localStorage.setItem('userData',JSON.stringify(user));
      return authenticateSuccess({
        email: email,
        userId: userId,
        token: token,
        expireDate: expirationDate,
      });
    };

    readonly timerLogout = (resData: AuthResponseData) => {
      this.authService.setLogoutTimer(+resData.expiresIn * 1000 );
    };

    readonly handleError = (errorRes: any) => {
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
                authenticateFail({error: errorMessage}));
    };

    

    authSignup = createEffect(() => 
    this.actions$.pipe(
      ofType(signUpStart),
      switchMap((signUpAction: {email: string, password: string}) => {
        return this.https
         .post<AuthResponseData>(
          this.apiSignUp,
          { 
            email: signUpAction.email,
            password: signUpAction.password,
            returnSecureToken: true
          })
          .pipe(
            tap(resData => { this.timerLogout(resData); }),
            map((resData) => {
              return this.handleAuthentication(+resData.expiresIn,resData.email,resData.localId,resData.idToken);
            }),
            catchError((errorRes) => {
              return this.handleError(errorRes)
            })
          );
       })
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
            tap(resData => { this.timerLogout(resData); }),
            map((resData) => {
              return this.handleAuthentication(+resData.expiresIn,resData.email,resData.localId,resData.idToken);
            }),
            catchError((errorRes) => {
              return this.handleError(errorRes);
            })
          );
      })
    ));

    authLogout = createEffect(() => 
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['/auth']);
        }),
      ),
      {dispatch : false }
    )

    authRedirect = createEffect(() => 
      this.actions$.pipe(
        ofType(authenticateSuccess),
        tap(() => {
          this.router.navigate(['/']);
        }),   
      ),
      { dispatch : false }
    )

    autoLogin = createEffect(() => 
      this.actions$.pipe(
        ofType(autoLogin),
        map(() => {

          const userData:{
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
       } = JSON.parse(localStorage.getItem('userData'));
       if (!userData) {
           return {type : 'NULL'}
       }

       const loadedUser = new User(
           userData.email,
           userData.id,
           userData._token,
           new Date(userData._tokenExpirationDate)
       );

       if (loadedUser.token) {

           const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
           this.authService.setLogoutTimer(expirationDuration);
           return authenticateSuccess({
               email: loadedUser.email,
               userId: loadedUser.id,
               token: loadedUser.token,
               expireDate: new Date(userData._tokenExpirationDate)
           });
       }
         return {type : 'NULL'}
        })
      )
    )
}