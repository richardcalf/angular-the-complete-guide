import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthenticationSevice } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { map } from 'rxjs/operators';
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import { logout } from '../auth/store/auth.actions'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    constructor(private dataStore: DataStorageService, private authService:AuthenticationSevice, private store: Store<fromApp.AppState>) {}
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
        this.dataStore.storeRecipes();
    }

    onFetchData() {
        this.dataStore.fetchRecipes().subscribe();
    }

    onLogout() {
        this.store.dispatch(logout());
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}
