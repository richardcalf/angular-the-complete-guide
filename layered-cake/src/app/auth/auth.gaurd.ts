import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationSevice } from './auth.service';
import { map, tap, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGaurd implements CanActivate {
    constructor(private authService: AuthenticationSevice, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree |  Observable<boolean | UrlTree > | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1),
            map(user => {
            const isAuth = !!user;
            if(isAuth) {
                return true;
            }
            return this.router.createUrlTree(['/auth']);
        }), 
        // tap(isAuth => {
        //     if(!isAuth) {
        //         this.router.navigate(['/auth']);
        //     }
        // })
        );   
    }
}