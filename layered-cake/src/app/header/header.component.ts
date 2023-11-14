import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { map } from 'rxjs/operators';
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import { logout } from '../auth/store/auth.actions';
import { getRecipes, storeRecipes } from '../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    constructor(private store: Store<fromApp.AppState>) {}

    private userSub: Subscription;
    isAuthenticated = false;


    ngOnInit(): void {
        this.userSub = this.store.select('auth').pipe(map(authState => authState.user))
        
        .subscribe(user => {
            //this.isAuthenticated = !user ? false : true;
            this.isAuthenticated = !!user;
        });
    }
    
    onSaveData() {
        this.store.dispatch(storeRecipes());
    }

    onFetchData() {
        this.store.dispatch(getRecipes());
    }

    onLogout() {
        this.store.dispatch(logout());
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}
