import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationSevice } from "./auth.service";
import { take, exhaustMap } from 'rxjs/operators'
import { Recipe } from "../recipes/recipe.model";


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthenticationSevice) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                if(!user) {
                    return next.handle(request);
                }
                const authenticatedRequest = request.clone({params: new HttpParams().set('auth', user.token )});
                return next.handle(authenticatedRequest);
            }));
    }
}