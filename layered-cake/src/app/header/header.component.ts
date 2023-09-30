import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthenticationSevice } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    constructor(private dataStore: DataStorageService, private authService:AuthenticationSevice) {}
    private userSub: Subscription;
    isAuthenticated = false;


    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
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
        this.authService.signOut();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}
